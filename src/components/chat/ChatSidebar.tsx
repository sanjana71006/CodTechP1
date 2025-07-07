import { Hash, Users, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/useChat";
import { useAuth } from "@/components/auth/AuthProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

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
    <div className="floating-sidebar glass scrollbar-modern">
      {/* Header with user info */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-sidebar-foreground">Chat App</h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {user && (
          <p className="text-sm text-sidebar-foreground/70 mt-1">
            Welcome, {user.email}
          </p>
        )}
      </div>

      {/* Channels Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Hash className="w-4 h-4 text-sidebar-foreground/70" />
            <span className="text-sm font-medium text-sidebar-foreground uppercase tracking-wide">Channels</span>
          </div>
          
          <div className="space-y-1">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => {
                  onSelectChannel(channel.id);
                  onSelectUser(null);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                  selectedChannelId === channel.id && !selectedUser
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
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
            <Users className="w-4 h-4 text-sidebar-foreground/70" />
            <span className="text-sm font-medium text-sidebar-foreground uppercase tracking-wide">
              Online - {onlineUsers.length}
            </span>
          </div>
          
          <div className="space-y-2">
            {users.map((userProfile) => (
              <div
                key={userProfile.id}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sidebar-foreground/70 hover:bg-sidebar-accent/50 transition-colors"
              >
                <div className="relative">
                  <Avatar className="w-8 h-8 avatar-modern">
                    <AvatarImage src={userProfile.avatar_url || undefined} alt={userProfile.display_name} />
                    <AvatarFallback className="text-xs bg-gradient-primary text-white">
                      {userProfile.display_name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`status-indicator absolute -bottom-1 -right-1 ${
                    userProfile.status === 'online' ? 'status-online' :
                    userProfile.status === 'away' ? 'status-away' : 'status-offline'
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