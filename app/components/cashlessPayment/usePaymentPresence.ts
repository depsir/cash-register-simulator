import { useState, useRef, useEffect, useMemo } from "react";
import { supabase } from "~/lib/supabase";

interface PresenceUser {
  user: string;
  typing?: boolean;
  messagePreview?: string;
  hasPaid?: boolean;
  role?: 'sender' | 'receiver';
  amount?: number;
}

const usePaymentPresence = (channelId: string) => {
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

    const userStatus: PresenceUser = {
      user: `receiver-${channelId}`,
      role: 'receiver',
      amount: 42.42,
    };

    presenceChannel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await presenceChannel.track(userStatus);
      }
    });

    return () => {
      presenceChannel.unsubscribe();
    };
  }, [channelId]);

  const hasAnyUserPaid = useMemo(() => {
    return Object.values(presenceState).some((users: any) => {
      if (Array.isArray(users)) {
        return users.some((user: PresenceUser) => user.hasPaid === true);
      }
      return false;
    });
  }, [presenceState]);

  return { presenceState, hasAnyUserPaid };
};

export default usePaymentPresence;