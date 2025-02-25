import { useState, useEffect } from "react";

/**
 * A custom React hook that listens to a media query and returns whether it matches.
 *
 * @param query - A string representing the media query to be evaluated.
 * @returns A boolean value indicating whether the media query matches the current state.
 */
export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}
