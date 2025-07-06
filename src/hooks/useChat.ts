import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";

interface Channel {
  id: string;
  name: string;
  description: string | null;
}

interface Message {
  id: string;
  content: string;
  created_at: string;
  user_profiles: {
    display_name: string;
    avatar_url: string | null;
  };
}

interface UserProfile {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  status: string;
}

export const useChat = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;

    // Load initial data
    loadChannels();
    loadUsers();

    // Set user status to online
    updateUserStatus('online');

    // Subscribe to real-time updates
    const messagesSubscription = supabase
      .channel('messages')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            loadMessages(payload.new.channel_id);
          }
        }
      )
      .subscribe();

    const usersSubscription = supabase
      .channel('user_profiles')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'user_profiles' },
        () => {
          loadUsers();
        }
      )
      .subscribe();

    // Update status to offline when user leaves
    const handleBeforeUnload = () => {
      updateUserStatus('offline');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      messagesSubscription.unsubscribe();
      usersSubscription.unsubscribe();
      window.removeEventListener('beforeunload', handleBeforeUnload);
      updateUserStatus('offline');
    };
  }, [user]);

  const loadChannels = async () => {
    try {
      const { data, error } = await supabase
        .from('channels')
        .select('*')
        .order('name');

      if (error) throw error;
      setChannels(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading channels",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (channelId: string) => {
    try {
      const { data: messagesData, error } = await supabase
        .from('messages')
        .select('*')
        .eq('channel_id', channelId)
        .order('created_at');

      if (error) throw error;

      // Get user profiles for all message authors
      const userIds = [...new Set(messagesData?.map(m => m.user_id) || [])];
      const { data: profilesData } = await supabase
        .from('user_profiles')
        .select('user_id, display_name, avatar_url')
        .in('user_id', userIds);

      // Combine messages with user profiles
      const messagesWithProfiles = messagesData?.map(message => ({
        ...message,
        user_profiles: profilesData?.find(p => p.user_id === message.user_id) || {
          display_name: 'Unknown User',
          avatar_url: null
        }
      })) || [];

      setMessages(messagesWithProfiles);
    } catch (error: any) {
      toast({
        title: "Error loading messages",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('display_name');

      if (error) throw error;
      setUsers(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading users",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const sendMessage = async (channelId: string, content: string) => {
    if (!user || !content.trim()) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          channel_id: channelId,
          user_id: user.id,
          content: content.trim(),
        });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateUserStatus = async (status: 'online' | 'away' | 'offline') => {
    if (!user) return;

    try {
      await supabase
        .from('user_profiles')
        .update({ status })
        .eq('user_id', user.id);
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  return {
    channels,
    messages,
    users,
    loading,
    loadMessages,
    sendMessage,
    updateUserStatus,
  };
};