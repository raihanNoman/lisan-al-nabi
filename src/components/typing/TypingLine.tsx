import React, {
  ComponentProps,
  ComponentType,
  useEffect,
  useState,
} from "react";
import { TypingTriggers } from "./types";
import { TextBox } from "../../../types/styles";
import TAG_COLOR from "@/constants/corpus/tag-color";
import Typing from "./Typing";

type Part = { text: string; color: string } | [string, Tag];

interface props extends TextBox, Omit<ComponentProps<typeof Typing>, "text"> {
  highlightIndex?: "all" | "none" | number;
  arabic?: boolean;
  chunks: string[];
}

export default function TypingChunks({
  arabic,
  chunks,
  onFinish,
  highlightIndex,
  triggerStart,
  txtStyle,
  ...props
}: props) {
  const [animatedIndex, setAnimatedIndex] = useState(-1);

  useEffect(() => {
    if (animatedIndex == chunks.length) onFinish?.();
  }, [animatedIndex]);

  useEffect(() => {
    if (triggerStart) setAnimatedIndex(0);
  }, [triggerStart]);

  return chunks.map((chunk, index) => {
    // let text, color;
    // if (Array.isArray(part)) {
    //     text = part[0];
    //     color = TAG_COLOR[part[1]];
    // } else {
    //     text = part.text;
    //     color = part.color;
    // }

    return (
      <Typing
        key={index}
        {...props}
        arabic={arabic}
        triggerStart={index == animatedIndex}
        onFinish={() => setAnimatedIndex((prev) => (prev += 1))}
        style={[
          txtStyle,
          {
            opacity:
              highlightIndex == "none"
                ? 0.4
                : highlightIndex === "all" ||
                    highlightIndex === undefined ||
                    highlightIndex < 0 ||
                    highlightIndex > chunks.length - 1 ||
                    index === highlightIndex
                  ? 1
                  : 0.4,
          },
        ]}
        text={chunk}
      />
    );
  });
}
