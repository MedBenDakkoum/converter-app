import { useEffect, useRef } from 'react';

function useCompare(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return value !== ref.current;
}

export default useCompare;
