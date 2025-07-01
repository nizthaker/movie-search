import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay: number) => {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const helper = setTimeout(() => setDebounce(value), delay);
    return () => clearTimeout(helper);
  }, [delay, value]);

  return debounce;
};
