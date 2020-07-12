import React, { useEffect, useCallback } from "react";
import { PolySynth, Synth } from "tone";

const synth = new PolySynth(8, Synth, {  
  envelope: {
    attack: 0.6,
    decay: 0.1,
    release: 5,
    sustain: 0.4
  },
  oscillator: {
    count: 8,
    detune: 10,
    type: "square"
  }
}).toMaster();

// const randomElementFromArray = (arr: string[]): string => arr[Math.floor(Math.random() * arr.length)];

const mapKeyCodeToNode = {
  a: "C3",
  d: "E3",
  f: "F3",
  g: "G3",
  h: "A3",
  j: "B3",
  s: "D3"
};


function Oscillator(): JSX.Element {
  const playNote = useCallback((event: KeyboardEvent) => {
    console.log("event", event);
    const { key } = event || {};

    synth.triggerAttackRelease(mapKeyCodeToNode[key], "8n");
  }, []);

  useEffect(() => {
    window.addEventListener("keypress", playNote, false);
  }, [playNote]);

  return (
    <div>
      Solar
    </div>
  );
}

export default Oscillator;
