import { Loop } from "tone";
import { Dispatch, SetStateAction } from "react";

export interface UseLoop {
  bpm: number;
  loopInstance: Loop;
  loopState: string;
  setBpm: Dispatch<SetStateAction<number>>;
  startLoop: (id: string) => Promise<void>;
  stopLoop: () => void;
}