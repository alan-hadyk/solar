import { useState } from "react";
import Tone, { Transport, Pattern } from "tone";
import StartAudioContext from "startaudiocontext";

import { UsePattern } from "<hooks>/__typings__/usePattern.d.ts";

function usePattern(initialPattern: string[]): UsePattern {
  const [patternNotes, setPatternNotes] = useState<string[]>(initialPattern);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [patternInstance] = useState<any>(new Pattern((): boolean => true, initialPattern, "up"));

  return {
    patternInstance,
    patternNotes,
    startPattern,
    stopPattern,
    updatePattern
  };

  async function startPattern(id: string): Promise<void> {
    await StartAudioContext(Tone.context, id);

    Transport.start();
    patternInstance.start(0);
  }

  function stopPattern(): void {
    patternInstance.stop();
  }

  function updatePattern(note: string, index: number): void {
    const newPatternNotes: string[] = [...patternNotes];
    newPatternNotes[index] = note;

    patternInstance.values = newPatternNotes;

    setPatternNotes(newPatternNotes);
  }
}

export default usePattern;