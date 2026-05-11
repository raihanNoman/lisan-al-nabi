export interface SnapScrollProps {
  postIDs: string[];
  postHeight: number;
  onScroll: (index: number) => void;
}
