import React, { useEffect, useState } from "react";

function useDebounce({
  value,
  delay,
}: {
  value: string;
  delay: number;
}) {
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default useDebounce;
