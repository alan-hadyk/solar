import { UseLoop } from "<hooks>/__typings__/useLoop.d.ts";
import { UsePolySynth } from "<hooks>/__typings__/usePolySynth.d.ts";

export interface ModuleState {
  loop: UseLoop;
  polySynth: UsePolySynth;
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