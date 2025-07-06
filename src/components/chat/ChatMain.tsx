import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { Hash, AtSign } from "lucide-react";
import { useChat } from "@/hooks/useChat";

interface ChatMainProps {
  selectedChannelId: string;
  selectedUser: string | null;
}

export const ChatMain = ({ selectedChannelId, selectedUser }: ChatMainProps) => {
  const { channels } = useChat();
  
  const getHeaderInfo = () => {
    if (selectedUser) {
      return {
        icon: <AtSign className="w-5 h-5" />,
        title: "Direct Message",
        subtitle: "Coming soon..."
      };
    }
    
    const channel = channels.find(c => c.id === selectedChannelId);
    return {
      icon: <Hash className="w-5 h-5" />,
      title: channel?.name || 'Select a channel',
      subtitle: channel?.description || `Welcome to #${channel?.name}`
    };
  };

  const { icon, title, subtitle } = getHeaderInfo();

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="h-16 border-b border-border flex items-center px-6 bg-card">
        <div className="flex items-center gap-3">
          <div className="text-muted-foreground">
            {icon}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <MessageList selectedChannelId={selectedChannelId} selectedUser={selectedUser} />
        <MessageInput selectedChannelId={selectedChannelId} selectedUser={selectedUser} />
      </div>
    </div>
  );
};