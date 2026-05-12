import { useCallback, useMemo, useState } from "react";

type ReachEndConfig = {
  /**
   * Whether to continue looping after reaching the end.
   *
   * true  -> continues looping
   * false -> stops at the last item
   */
  continue: boolean;

  /**
   * Called when attempting to go past the last item.
   */
  execute?: () => void;
};

type UseStateLooperProps = {
  onReachEnd?: ReachEndConfig;
};

export function useStateLooper<T>(options: T[], props?: UseStateLooperProps) {
  const { onReachEnd } = props ?? {};

  const [idx, setIdx] = useState(0);

  const count = options.length;

  const currentOption = useMemo(() => {
    if (count === 0) return null;
    return options[idx];
  }, [options, idx, count]);

  const next = useCallback(() => {
    if (count === 0) return;

    setIdx((prev) => {
      const isLast = prev >= count - 1;

      if (isLast) {
        onReachEnd?.execute?.();

        // Stop at end
        if (onReachEnd && !onReachEnd.continue) {
          return prev;
        }
      }

      // Default infinite loop behavior
      return (prev + 1) % count;
    });
  }, [count, onReachEnd]);

  const prev = useCallback(() => {
    if (count === 0) return;

    setIdx((prev) => (prev - 1 + count) % count);
  }, [count]);

  const setIndex = useCallback(
    (value: number) => {
      if (count === 0) return;

      const normalized = ((value % count) + count) % count;
      setIdx(normalized);
    },
    [count],
  );

  return {
    currentOption: currentOption as T,
    currentOptionIdx: idx,

    isFirst: idx === 0,
    isLast: idx === count - 1,

    trigger: {
      next,
      prev,
    },

    setIndex,
    count,
  };
}
