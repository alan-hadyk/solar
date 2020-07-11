import { useState, useEffect } from "react";
import { PolySynth, Synth } from "tone";

import { UsePolySynth } from "<hooks>/__typings__/usePolySynth.d.ts";

import { InitialSettings } from "<state>/__typings__/withSynthState";

function usePolySynth(initialSettings: InitialSettings): UsePolySynth {
  const [polyphony, setPolyphony] = useState<number>(16);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [polySynthInstance] = useState<any>(createPolySynth());

  useEffect(() => {
    polySynthInstance.set("volume", -5);
  }, []);

  return {
    polySynthInstance,
    polyphony,
    setPolyphony
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function createPolySynth(): any {
    return new PolySynth(polyphony, Synth, initialSettings).toMaster();
  }
}

export default usePolySynth;