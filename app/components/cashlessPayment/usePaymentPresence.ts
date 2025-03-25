import { useState, useRef, useEffect, useMemo } from "react";
import { supabase } from "~/lib/supabase";

export interface PresenceUser {
  user: string;
  typing?: boolean;
  messagePreview?: string;
  hasPaid?: boolean;
  role?: 'sender' | 'receiver';
  amount?: number;
}

const usePaymentPresence = (channelId: string, userStatus: PresenceUser) => {
  const [presenceState, setPresenceState] = useState<Record<string, unknown>>({});
  const presenceChannelRef = useRef<any>(null);

  useEffect(() => {
    const channelName = `payment/${channelId}/presence`;
    const presenceChannel = supabase.channel(channelName, {
      config: {
        presence: {
          key: channelId,
        },
      },
    });
    presenceChannelRef.current = presenceChannel;

    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const newState = presenceChannel.presenceState();
        setPresenceState({ ...newState });
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        setPresenceState((prevState) => ({
          ...prevState,
          [key]: newPresences,
        }));
      })
      .on('presence', { event: 'leave' }, ({ key }) => {
        setPresenceState((prevState) => {
          const newState = { ...prevState };
          delete newState[key];
          return newState;
        });
      });

    presenceChannel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await presenceChannel.track(userStatus);
      }
    });

    return () => {
      presenceChannel.unsubscribe();
    };
  }, [channelId, userStatus]);

  const hasAnyUserPaid = useMemo(() => {
    return Object.values(presenceState).some((users: any) => {
      if (Array.isArray(users)) {
        return users.some((user: PresenceUser) => user.hasPaid === true);
      }
      return false;
    });
  }, [presenceState]);

  const amount = useMemo(() => {
    const users = presenceState[channelId] as PresenceUser[];
    const receiver = users?.find((user) => user.role === 'receiver');
    return receiver?.amount ?? null;
  }
  , [presenceState, channelId]);
  const trackPresenceUpdate = async (update: Partial<PresenceUser>) => {
    if (presenceChannelRef.current) {
      await presenceChannelRef.current.track(update);
    } else {
      console.error('Presence channel is not initialized.');
    }
  };
  
  return { presenceState, hasAnyUserPaid, amount,trackPresenceUpdate };
};

export default usePaymentPresence;