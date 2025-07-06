import { useState } from "react";
import { ChatSidebar } from "./ChatSidebar";
import { ChatMain } from "./ChatMain";

export const ChatLayout = () => {
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <div className="h-screen flex bg-background">
      <ChatSidebar 
        selectedChannel={selectedChannel}
        onSelectChannel={setSelectedChannel}
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
      />
      <ChatMain 
        selectedChannel={selectedChannel}
        selectedUser={selectedUser}
      />
    </div>
  );
};