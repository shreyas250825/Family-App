import { useEffect, useRef } from 'react';
import { supabase } from '../services/supabase';

export const useRealtime = (channel: string, event: string, callback: (payload: any) => void) => {
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    const subscription = supabase
      .channel(channel)
      .on('postgres_changes', { event, schema: 'public' }, callback)
      .subscribe();

    subscriptionRef.current = subscription;

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [channel, event, callback]);
};
