import { getRandom } from "./get";

export const useRandomLN = () => getRandom(["bn", "en", "hi", "ur"] as Languages[]);
