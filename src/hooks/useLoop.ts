import { useState, useEffect } from "react";
import Tone, { Loop, Transport } from "tone";
import StartAudioContext from "startaudiocontext";

import { UseLoop } from "<hooks>/__typings__/useLoop.d.ts";

const emptyCallback = (time: number): boolean => {
  console.log("loop start", time);
  return true;
};

const loopInstance = new Loop(emptyCallback, "1n");

function useLoop(): UseLoop {
  const [bpm, setBpm] = useState<number>(120);
  const [loopState, setLoopState] = useState<string>("stopped");

  useEffect(() => {
    Transport.bpm.value = bpm;
  }, [bpm]);

  return {
    bpm,
    loopInstance,
    loopState,
    setBpm,
    startLoop,
    stopLoop
  };

  async function startLoop(id: string): Promise<void> {
    await StartAudioContext(Tone.context, id);

    Transport.start();
    loopInstance.start(0);
    setLoopState("started");
  }

  function stopLoop(): void {
    loopInstance.stop();
    setLoopState("stopped");
  }
}

export default useLoop;