import { useState } from "react";
import { Send, Smile, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MessageInputProps {
  selectedChannel: string;
  selectedUser: string | null;
}

export const MessageInput = ({ selectedChannel, selectedUser }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      // In a real app, this would send the message via Socket.IO or Supabase
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const placeholder = selectedUser 
    ? `Message Alice Johnson`
    : `Message #${selectedChannel}`;

  return (
    <div className="p-4 border-t border-border bg-card">
      <div className="flex items-end gap-3">
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="pr-20 py-3 text-sm resize-none"
          />
          
          {/* Input actions */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <Button
          onClick={handleSend}
          disabled={!message.trim()}
          className="h-10 px-4"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground">
        Press Enter to send, Shift + Enter for new line
      </div>
    </div>
  );
};