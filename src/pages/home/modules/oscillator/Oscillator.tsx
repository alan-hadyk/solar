import React, { useEffect, useCallback } from "react";
// import { PolySynth, Synth } from "tone";

// const randomElementFromArray = (arr: string[]): string => arr[Math.floor(Math.random() * arr.length)];


function Oscillator(): JSX.Element {
  const playNote = useCallback((event: KeyboardEvent) => {
    console.log("event", event);
    const { key } = event || {};

    // synth.triggerAttackRelease(mapKeyCodeToNode[key], "8n");
  }, []);

  useEffect(() => {
    // window.addEventListener("keypress", playNote, false);
  }, [playNote]);

  return (
    <div>
      Solar
    </div>
  );
}

export default Oscillator;
