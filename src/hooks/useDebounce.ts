import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const setTimeValue = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(setTimeValue);
    };
  }, [value]);

  return debounceValue;
};