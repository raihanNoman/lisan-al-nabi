import { Quote } from "@/assets/data";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type PostListType = "New" | "Saved";
interface CurrentPost {
  quote: Quote | undefined;
  index: number;
}

const practiceSlice = createSlice({
  name: "practice-slice",
  initialState: {
    listType: "New" as PostListType,
    completedIDs: undefined as string[] | undefined,
    inReviewIDs: undefined as string[] | undefined,
    current: { quote: undefined, index: -1 } as CurrentPost,
  },
  reducers: {
    setCompletedIDs(s, a: PayloadAction<string[]>) {
      s.completedIDs = a.payload;
    },
    setInReviewIDs(s, a: PayloadAction<string[]>) {
      s.inReviewIDs = a.payload;
    },

    setPostListType(s, a: PayloadAction<PostListType>) {
      s.listType = a.payload;
    },
    setCurrentQuote(s, a: PayloadAction<CurrentPost>) {
      s.current = a.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default practiceSlice.reducer;
export const {} = practiceSlice.actions;
export type { PostListType };
