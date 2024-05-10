import { useCallback, useEffect } from 'react';

export const useInternetWatcher = (isOnine, isOffline) => {
  const isOnlineRef = useCallback(isOnine, []);
  const isOfflineRef = useCallback(isOffline, []);

  useEffect(() => {
    window.addEventListener('online', isOnlineRef);
    window.addEventListener('offline', isOfflineRef);

    return () => {
      window.removeEventListener('online', isOnlineRef);
      window.removeEventListener('offline', isOfflineRef);
    };
  }, []);
};
