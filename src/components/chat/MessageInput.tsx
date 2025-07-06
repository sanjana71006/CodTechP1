import { useState } from "react";
import { Send, Smile, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@/hooks/useChat";

interface MessageInputProps {
  selectedChannelId: string;
  selectedUser: string | null;
}

export const MessageInput = ({ selectedChannelId, selectedUser }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const { sendMessage, channels } = useChat();

  const handleSend = async () => {
    if (message.trim() && selectedChannelId) {
      await sendMessage(selectedChannelId, message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const channel = channels.find(c => c.id === selectedChannelId);
  const placeholder = selectedUser 
    ? `Direct messages coming soon...`
    : channel ? `Message #${channel.name}` : "Select a channel first";

  return (
    <div className="p-4 border-t border-border bg-card">
      <div className="flex items-end gap-3">
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={!selectedChannelId || selectedUser !== null}
            className="pr-20 py-3 text-sm resize-none"
          />
          
          {/* Input actions */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              disabled
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              disabled
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <Button
          onClick={handleSend}
          disabled={!message.trim() || !selectedChannelId || selectedUser !== null}
          className="h-10 px-4"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground">
        {selectedChannelId ? "Press Enter to send, Shift + Enter for new line" : "Select a channel to start messaging"}
      </div>
    </div>
  );
};