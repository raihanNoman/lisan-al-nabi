import React, { useEffect } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

import { QUOTES } from "@/assets/data";
import SnapScrollView from "@/components/ui/tiktok-scroll";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useAppDispatch } from "../../../redux/hooks";
import { setCurrentQuote } from "../../../redux/slice/quote";

const quotes = QUOTES.map((quote, i) => i.toString());

export default function ExploreScreen() {
  const theme = useTheme();
  const { height } = useWindowDimensions();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // init
    dispatch(setCurrentQuote({ index: 0, quote: QUOTES[0] }));
  }, []);

  function onScroll(index: number) {
    dispatch(setCurrentQuote({ index, quote: QUOTES[index] }));
    console.log("scroll index", index);
  }
  return (
    /** @see QuoteItem file:///Users/noman/Desktop/lisan/src/components/ui/QuoteItem.tsx     */
    <SnapScrollView postIDs={quotes} postHeight={height} onScroll={onScroll} />
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  contentContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
  },
  titleContainer: {
    gap: Spacing.three,
    alignItems: "center",
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
  },
  centerText: {
    textAlign: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  linkButton: {
    flexDirection: "row",
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
    justifyContent: "center",
    gap: Spacing.one,
    alignItems: "center",
  },
  sectionsWrapper: {
    gap: Spacing.five,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  collapsibleContent: {
    alignItems: "center",
  },
  imageTutorial: {
    width: "100%",
    aspectRatio: 296 / 171,
    borderRadius: Spacing.three,
    marginTop: Spacing.two,
  },
  imageReact: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
});
