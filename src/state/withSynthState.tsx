import React, { useState, useEffect } from "react";
import { Transport } from "tone";

import createState from "<helpers>/createState";

import usePattern from "<hooks>/usePattern";
import usePolySynth from "<hooks>/usePolySynth";
import useSequence from "<hooks>/useSequence";

import { InitialSettings, ModuleState } from "<state>/__typings__/withSynthState";

const {
  StateProvider,
  stateConsumer
} = createState("synthState");

const withSynthStateConsumer = stateConsumer;

const initialSettings: InitialSettings = {  
  envelope: {
    attack: 0.1,
    decay: 1,
    release: 0.1,
    sustain: 1
  },
  oscillator: {
    count: 1,
    detune: 20,
    type: "sawtooth6"
  }
};

const initialPattern: string[] = ["C4", "Db4", "E4", "F4", "G4", "A4", "Bb4", "C4", "Db4", "E4", "F4", "G4", "A4", "Bb4", "C4", "Db4"];
const initialSequence: (string[])[] = [
  ["C4"],
  ["E4"],
  ["Db4"],
  ["F4"],
  ["C4"],
  ["E4"],
  ["Db4"],
  ["F4"],
  [],
  ["E4"],
  [],
  ["F4"]
];

const withSynthStateProvider = (WrappedComponent: React.ComponentType<JSX.IntrinsicAttributes>) => (props: JSX.IntrinsicAttributes): JSX.Element => {
  const [loopState, setLoopState] = useState<string>("stopped");
  const [bpm, setBpm] = useState<number>(100);

  useEffect(() => {
    Transport.bpm.value = bpm;
  }, [bpm]);

  const pattern = usePattern(initialPattern);
  const sequence = useSequence(initialSequence);
  const polySynth = usePolySynth(initialSettings);

  const moduleState: ModuleState = {
    bpm,
    loopState,
    pattern,
    polySynth,
    sequence,
    setBpm,
    setLoopState
  };

  return (
    <StateProvider 
      WrappedComponent={WrappedComponent} 
      moduleState={moduleState}
      otherProps={props} 
    />
  );
};

export { 
  withSynthStateConsumer,
  withSynthStateProvider
};