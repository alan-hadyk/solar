import { Dispatch, SetStateAction } from "react";
import { PolySynth } from "tone";

export interface UsePolySynth {
  polySynthInstance: PolySynth;
  polyphony: number;
  setPolyphony: Dispatch<SetStateAction<number>>;
}