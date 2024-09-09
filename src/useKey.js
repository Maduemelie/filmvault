import { useEffect } from 'react';

export const useKey = (key, callback) => {
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === key) {
        callback();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [key, callback]);
};
