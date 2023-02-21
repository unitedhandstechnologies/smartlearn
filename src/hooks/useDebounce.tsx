import { useState, useEffect } from 'react';

export const useDebounce = (value: any, delay: number) => {
  const [debounceVal, setDebounceVal] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVal(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debounceVal;
};
