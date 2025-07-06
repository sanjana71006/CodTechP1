import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: string;
  avatar: string;
}

interface MessageListProps {
  selectedChannel: string;
  selectedUser: string | null;
}

// Mock messages for demo
const mockMessages: Message[] = [
  {
    id: "1",
    user: "Alice Johnson",
    content: "Hey everyone! How's the project going?",
    timestamp: "10:30 AM",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: "2",
    user: "Bob Smith",
    content: "Great! Just finished the authentication flow. The new design looks amazing! 🎉",
    timestamp: "10:32 AM",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: "3",
    user: "Carol Davis",
    content: "Nice work Bob! I'm working on the database schema now. Should have it ready by tomorrow.",
    timestamp: "10:35 AM",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: "4",
    user: "Alice Johnson",
    content: "Perfect! Let me know if you need any help with the queries.",
    timestamp: "10:36 AM",
    avatar: "/api/placeholder/40/40"
  }
];

export const MessageList = ({ selectedChannel, selectedUser }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mockMessages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {mockMessages.map((message, index) => {
        const prevMessage = mockMessages[index - 1];
        const showAvatar = !prevMessage || prevMessage.user !== message.user;
        
        return (
          <div key={message.id} className={`flex gap-3 ${!showAvatar ? 'ml-14' : ''}`}>
            {showAvatar && (
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarImage src={message.avatar} alt={message.user} />
                <AvatarFallback className="text-sm">
                  {message.user.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            )}
            
            <div className="flex-1 min-w-0">
              {showAvatar && (
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold text-foreground text-sm">
                    {message.user}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp}
                  </span>
                </div>
              )}
              <div className="text-foreground text-sm leading-relaxed break-words">
                {message.content}
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Typing indicator placeholder */}
      <div className="flex items-center gap-3 opacity-50">
        <Avatar className="w-6 h-6">
          <AvatarFallback className="text-xs">BD</AvatarFallback>
        </Avatar>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <span className="text-sm text-muted-foreground">David is typing...</span>
      </div>
      
      <div ref={messagesEndRef} />
    </div>
  );
};