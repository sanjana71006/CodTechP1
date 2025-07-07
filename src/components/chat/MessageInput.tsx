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
    <div className="floating-input p-4">
      <div className="flex items-end gap-3">
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={!selectedChannelId || selectedUser !== null}
            className="pr-20 py-4 text-base rounded-2xl border-0 bg-transparent focus:ring-2 focus:ring-primary/20"
          />
          
          {/* Input actions */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-foreground/60 hover:text-foreground hover:bg-primary/10 rounded-full"
              disabled
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-foreground/60 hover:text-foreground hover:bg-primary/10 rounded-full"
              disabled
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <Button
          onClick={handleSend}
          disabled={!message.trim() || !selectedChannelId || selectedUser !== null}
          className="h-12 px-6 btn-gradient rounded-2xl shadow-lg hover:scale-105 transition-all duration-200"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="mt-3 text-xs text-foreground/50 text-center">
        {selectedChannelId ? "Press Enter to send, Shift + Enter for new line" : "Select a channel to start messaging"}
      </div>
    </div>
  );
};