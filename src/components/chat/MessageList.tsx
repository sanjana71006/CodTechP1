import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChat } from "@/hooks/useChat";

interface MessageListProps {
  selectedChannelId: string;
  selectedUser: string | null;
}

export const MessageList = ({ selectedChannelId, selectedUser }: MessageListProps) => {
  const { messages, loadMessages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedChannelId) {
      loadMessages(selectedChannelId);
    }
  }, [selectedChannelId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!selectedChannelId) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">Welcome to Chat App!</h3>
          <p className="text-muted-foreground">Select a channel to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-modern">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center glass p-8 rounded-2xl">
            <p className="text-foreground/60 text-lg">No messages yet. Start the conversation!</p>
          </div>
        </div>
      ) : (
        messages.map((message, index) => {
          const prevMessage = messages[index - 1];
          const showAvatar = !prevMessage || prevMessage.user_profiles?.display_name !== message.user_profiles?.display_name;
          
          const messageTime = new Date(message.created_at).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          });
          
          return (
            <div key={message.id} className={`flex gap-4 animate-fade-in ${!showAvatar ? 'ml-16' : ''}`}>
              {showAvatar && (
                <Avatar className="w-12 h-12 flex-shrink-0 avatar-modern">
                  <AvatarImage src={message.user_profiles?.avatar_url || undefined} alt={message.user_profiles?.display_name} />
                  <AvatarFallback className="text-sm bg-gradient-primary text-white font-medium">
                    {message.user_profiles?.display_name?.split(' ').map(n => n[0]).join('') || 'U'}
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className="flex-1 min-w-0">
                {showAvatar && (
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-semibold text-foreground text-base">
                      {message.user_profiles?.display_name || 'Unknown User'}
                    </span>
                    <span className="text-xs text-foreground/50">
                      {messageTime}
                    </span>
                  </div>
                )}
                <div className="chat-bubble chat-bubble-other glass">
                  {message.content}
                </div>
              </div>
            </div>
          );
        })
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};