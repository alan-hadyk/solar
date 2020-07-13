import { useState, useEffect } from "react";

import { UsePolySynth } from "<hooks>/__typings__/usePolySynth.d.ts";

import { InitialSettings } from "<state>/__typings__/withSynthState";

function usePolySynth(initialSettings: InitialSettings): UsePolySynth {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [polySynthInstance] = useState<any>(createPolySynth());

  useEffect(() => {
    // polySynthInstance.set("volume", -8);
  }, [polySynthInstance]);

  return {
    polySynthInstance
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function createPolySynth(): any {
    return 12;
  }
}

export default usePolySynth;