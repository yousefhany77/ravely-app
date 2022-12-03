import { useEffect, useRef } from "react";

function useMonted() {
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return {
    mounted: mounted.current,
  };
}

export default useMonted;
