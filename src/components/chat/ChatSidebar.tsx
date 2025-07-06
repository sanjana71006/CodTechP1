import { Hash, Users, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/useChat";
import { useAuth } from "@/components/auth/AuthProvider";

interface ChatSidebarProps {
  selectedChannelId: string;
  onSelectChannel: (channelId: string) => void;
  selectedUser: string | null;
  onSelectUser: (user: string | null) => void;
}

export const ChatSidebar = ({ selectedChannelId, onSelectChannel, selectedUser, onSelectUser }: ChatSidebarProps) => {
  const { channels, users } = useChat();
  const { signOut, user } = useAuth();
  const onlineUsers = users.filter(u => u.status === 'online');

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      {/* Header with user info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">Chat App</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="h-8 w-8 p-0"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
        {user && (
          <p className="text-sm text-muted-foreground mt-1">
            Welcome, {user.email}
          </p>
        )}
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
                  selectedChannelId === channel.id && !selectedUser
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                }`}
              >
                <span>#{channel.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Users Section */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground uppercase tracking-wide">
              Online - {onlineUsers.length}
            </span>
          </div>
          
          <div className="space-y-2">
            {users.map((userProfile) => (
              <div
                key={userProfile.id}
                className="flex items-center gap-3 px-2 py-2 rounded text-muted-foreground"
              >
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={userProfile.avatar_url || undefined} alt={userProfile.display_name} />
                    <AvatarFallback className="text-xs">
                      {userProfile.display_name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${
                    userProfile.status === 'online' ? 'bg-green-500' :
                    userProfile.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`} />
                </div>
                <span className="text-sm font-medium truncate">{userProfile.display_name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};