import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { Hash, AtSign } from "lucide-react";

interface ChatMainProps {
  selectedChannel: string;
  selectedUser: string | null;
}

export const ChatMain = ({ selectedChannel, selectedUser }: ChatMainProps) => {
  const getHeaderInfo = () => {
    if (selectedUser) {
      // In a real app, you'd get user info from your data
      return {
        icon: <AtSign className="w-5 h-5" />,
        title: "Alice Johnson", // This would come from user data
        subtitle: "Direct Message"
      };
    }
    
    return {
      icon: <Hash className="w-5 h-5" />,
      title: selectedChannel,
      subtitle: `Welcome to #${selectedChannel}`
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
        <MessageList selectedChannel={selectedChannel} selectedUser={selectedUser} />
        <MessageInput selectedChannel={selectedChannel} selectedUser={selectedUser} />
      </div>
    </div>
  );
};