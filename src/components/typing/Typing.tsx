import React, { useEffect, useState } from "react";
import Arabic, { ArabicTextProps } from "../themed-arabic";
import { TypingTriggers } from "./types";
import { Text } from "../Themed";

interface props extends ArabicTextProps, TypingTriggers {
  arabic?: boolean;
  text: string;
  speedMS?: number;
  delayMS?: number;
}

export default function Typing({
  arabic,
  text,
  speedMS = 75,
  delayMS = 0,
  triggerStart,
  forceEnd,
  onFinish,
  ...p
}: props) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);
  const [typingInterval, setTypingInterval] = useState<number>();

  useEffect(() => {
    setDisplayedText("");
    setIndex(0);
    setStartTyping(false);
  }, [text]);

  useEffect(() => {
    if (forceEnd) {
      setDisplayedText(text);
      setStartTyping(false);
      setIndex(0);

      clearTimeout(typingInterval);
    }
  }, [forceEnd, typingInterval]);

  useEffect(() => {
    if (triggerStart === false) return;

    const startTimeout = setTimeout(() => {
      setStartTyping(true);
    }, delayMS);

    setTypingInterval(startTimeout);

    return () => {
      clearTimeout(startTimeout);
    };
  }, [delayMS, triggerStart, text, forceEnd]);

  useEffect(() => {
    if (startTyping && index < text.length) {
      const typingTimeout = setTimeout(() => {
        setDisplayedText(displayedText + text.charAt(index));
        setIndex(index + 1);
      }, speedMS);

      return () => {
        clearTimeout(typingTimeout);
      };
    } else if (startTyping && index >= text.length) {
      onFinish?.(); // Call onFinish when typing is complete
    }
  }, [index, text, displayedText, startTyping]);

  if (arabic) {
    return <Arabic {...p}>{displayedText}</Arabic>;
  } else {
    return <Text {...p}>{displayedText}</Text>;
  }
}
