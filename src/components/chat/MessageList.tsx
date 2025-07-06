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
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
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
            <div key={message.id} className={`flex gap-3 ${!showAvatar ? 'ml-14' : ''}`}>
              {showAvatar && (
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage src={message.user_profiles?.avatar_url || undefined} alt={message.user_profiles?.display_name} />
                  <AvatarFallback className="text-sm">
                    {message.user_profiles?.display_name?.split(' ').map(n => n[0]).join('') || 'U'}
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className="flex-1 min-w-0">
                {showAvatar && (
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-semibold text-foreground text-sm">
                      {message.user_profiles?.display_name || 'Unknown User'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {messageTime}
                    </span>
                  </div>
                )}
                <div className="text-foreground text-sm leading-relaxed break-words">
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