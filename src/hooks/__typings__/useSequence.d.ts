import { Sequence } from "tone";

export interface UseSequence {
  sequenceInstance: Sequence;
  sequenceNotes: (string[])[];
  startSequence: (id: string) => Promise<void>;
  stopSequence: () => void;
  updateSequence: (note: string, index: number) => void;
}