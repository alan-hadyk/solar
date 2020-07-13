import { useState } from "react";
import StartAudioContext from "startaudiocontext";

import { UseSequence } from "<hooks>/__typings__/useSequence.d.ts";

function usePattern(initialSequence: UseSequence["sequenceNotes"]): UseSequence {
  const [sequenceNotes, setSequenceNotes] = useState<UseSequence["sequenceNotes"]>(initialSequence);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sequenceInstance] = useState<any>(123);

  return {
    sequenceInstance,
    sequenceNotes,
    startSequence,
    stopSequence,
    updateSequence
  };

  async function startSequence(id: string): Promise<void> {
    // await StartAudioContext(Tone.context, id);
  }

  function stopSequence(): void {

  }

  function updateSequence(note: string, index: number): void {
    const newPatternNotes: UseSequence["sequenceNotes"] = [...sequenceNotes];

    if (newPatternNotes[index] && newPatternNotes[index].includes(note)) {
      newPatternNotes[index] = newPatternNotes[index].filter(_note => _note !== note);
    } else {
      newPatternNotes[index].push(note);
    }

    sequenceInstance.at(index, newPatternNotes[index]);

    setSequenceNotes(newPatternNotes);
  }
}

export default usePattern;