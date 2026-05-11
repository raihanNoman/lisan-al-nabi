import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useRef } from "react";

import Empty from "../Empty";
import QuoteItem from "./QuoteItem";
import { SnapScrollProps } from "./tiktok-scroll-props";

export default function SnapScrollView({
  postIDs,
  onScroll,
  postHeight = 100,
}: SnapScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll to update Redux state
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const scrollTop = containerRef.current.scrollTop;
    const index = Math.round(scrollTop / postHeight);

    const safeIndex = Math.max(0, Math.min(index, postIDs.length - 1));
    const id = postIDs[safeIndex];

    onScroll(safeIndex);
  }, [postHeight, postIDs]);

  // Use Intersection Observer for more performant "active" tracking if needed,
  // but for reels, a simple scroll listener with snap is usually sufficient.

  if (postIDs.length === 0) {
    return (
      <Empty
        label="No more posts"
        fillScreen
        icon={<Ionicons name="cloud-outline" />}
      />
    );
  }

  return (
    <div style={webStyles.container}>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          ...webStyles.scrollList,
          height: postHeight,
        }}
      >
        {postIDs.map((id, index) => (
          <div key={id} style={{ ...webStyles.item, height: postHeight }}>
            <QuoteItem height={postHeight} index={index} id={id} />
          </div>
        ))}

        {/* Footer Logic */}
        <div style={{ ...webStyles.item, height: postHeight }}>
          <Empty
            label="Watched all posts!"
            boxStyle={{ height: postHeight }}
            icon={<Ionicons name="cloud-done" />}
          />
        </div>
      </div>
    </div>
  );
}

const webStyles: Record<string, React.CSSProperties> = {
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    //   maxWidth: MaxContentWidth,
    alignSelf: "center",
    backgroundColor: "#000",
    overflow: "hidden",
  },
  scrollList: {
    width: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    scrollSnapType: "y mandatory",
    scrollBehavior: "smooth",
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE/Edge
  },
  item: {
    width: "100%",
    scrollSnapAlign: "start",
    scrollSnapStop: "always", // Essential for the "snappy" reel feel
    flexShrink: 0,
  },
};

// Add global style to hide scrollbars on Chrome/Safari
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
        div::-webkit-scrollbar {
            display: none;
        }
    `;
  document.head.appendChild(style);
}
