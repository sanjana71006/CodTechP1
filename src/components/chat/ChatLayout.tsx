import { useState, useEffect } from "react";
import { ChatSidebar } from "./ChatSidebar";
import { ChatMain } from "./ChatMain";
import { useAuth } from "@/components/auth/AuthProvider";
import { AuthModal } from "@/components/auth/AuthModal";
import { useChat } from "@/hooks/useChat";

export const ChatLayout = () => {
  const [selectedChannelId, setSelectedChannelId] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const { channels, loading: chatLoading } = useChat();

  // Set first channel as default when channels load
  useEffect(() => {
    if (channels.length > 0 && !selectedChannelId) {
      setSelectedChannelId(channels[0].id);
    }
  }, [channels, selectedChannelId]);

  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="h-screen flex items-center justify-center bg-background">
          <div className="text-center max-w-md px-4">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Welcome to Chat App</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Connect with others in real-time. Join channels, send messages, and stay in touch!
            </p>
            <button
              onClick={() => setAuthModalOpen(true)}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
        <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
      </>
    );
  }

  return (
    <div className="h-screen bg-gradient-primary relative overflow-hidden">
      {/* Floating Sidebar */}
      <ChatSidebar 
        selectedChannelId={selectedChannelId}
        onSelectChannel={setSelectedChannelId}
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
      />
      
      {/* Main Chat Area */}
      <div className="md:ml-80 h-full">
        <ChatMain 
          selectedChannelId={selectedChannelId}
          selectedUser={selectedUser}
        />
      </div>
    </div>
  );
};