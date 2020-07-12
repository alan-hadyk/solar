import { UsePolySynth } from "<hooks>/__typings__/usePolySynth.d.ts";
import { UsePattern } from "<hooks>/__typings__/usePattern.d.ts";
import { UseSequence } from "<hooks>/__typings__/useSequence.d.ts";

export interface ModuleState {
  bpm: number;
  loopState: string;
  pattern: UsePattern;
  polySynth: UsePolySynth;
  sequence: UseSequence;
  setBpm: Dispatch<SetStateAction<number>>;
  setLoopState: Dispatch<SetStateAction<string>>;
}

export interface SynthState {
  synthState: ModuleState;
}

interface Envelope {
  attack: number;
  decay: number;
  release: number;
  sustain: number;
}

interface Oscillator {
  count: number;
  detune: number;
  type: string;
}

export interface InitialSettings {
  envelope: Envelope;
  oscillator: Oscillator;
}
