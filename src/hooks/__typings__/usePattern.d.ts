import { Pattern } from "tone";

export interface UsePattern {
  patternInstance: Pattern;
  patternNotes: string[];
  startPattern: (id: string) => Promise<void>;
  stopPattern: () => void;
  updatePattern: (note: string, index: number) => void;
}