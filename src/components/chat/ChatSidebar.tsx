import { Hash, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ChatSidebarProps {
  selectedChannel: string;
  onSelectChannel: (channel: string) => void;
  selectedUser: string | null;
  onSelectUser: (user: string | null) => void;
}

const channels = [
  { id: "general", name: "general", unread: 0 },
  { id: "random", name: "random", unread: 3 },
  { id: "development", name: "development", unread: 1 },
];

const users = [
  { id: "1", name: "Alice Johnson", status: "online", avatar: "/api/placeholder/32/32" },
  { id: "2", name: "Bob Smith", status: "away", avatar: "/api/placeholder/32/32" },
  { id: "3", name: "Carol Davis", status: "offline", avatar: "/api/placeholder/32/32" },
  { id: "4", name: "David Wilson", status: "online", avatar: "/api/placeholder/32/32" },
];

export const ChatSidebar = ({ selectedChannel, onSelectChannel, selectedUser, onSelectUser }: ChatSidebarProps) => {
  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      {/* Server Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-lg font-semibold text-foreground">Chat App</h1>
      </div>

      {/* Channels Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Hash className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground uppercase tracking-wide">Channels</span>
          </div>
          
          <div className="space-y-1">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => {
                  onSelectChannel(channel.id);
                  onSelectUser(null);
                }}
                className={`w-full flex items-center justify-between px-2 py-1 rounded text-sm transition-colors ${
                  selectedChannel === channel.id && !selectedUser
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                }`}
              >
                <span>#{channel.name}</span>
                {channel.unread > 0 && (
                  <Badge variant="destructive" className="h-5 text-xs">
                    {channel.unread}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Users Section */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground uppercase tracking-wide">Online - {users.filter(u => u.status === 'online').length}</span>
          </div>
          
          <div className="space-y-2">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => {
                  onSelectUser(user.id);
                  onSelectChannel("");
                }}
                className={`w-full flex items-center gap-3 px-2 py-2 rounded transition-colors ${
                  selectedUser === user.id
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                }`}
              >
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-xs">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${
                    user.status === 'online' ? 'bg-green-500' :
                    user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`} />
                </div>
                <span className="text-sm font-medium truncate">{user.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};