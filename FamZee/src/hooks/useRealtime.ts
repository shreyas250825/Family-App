import { useEffect, useRef } from 'react';
import { supabase } from '../services/supabase';

export const useRealtime = (channel: string, event: string, callback: (payload: any) => void) => {
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    // Supabase types for channel postgres_changes have become stricter.
    // Cast the filter object to the expected type to avoid TS2769.
    const subscription = supabase
      .channel(channel)
      .on(
        'postgres_changes',
        { event, schema: 'public' } as any,
        callback as any
      )
      .subscribe();


    subscriptionRef.current = subscription;

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [channel, event, callback]);
};
