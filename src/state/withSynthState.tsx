import React from "react";

import createState from "<helpers>/createState";

import useLoop from "<hooks>/useLoop";
import usePolySynth from "<hooks>/usePolySynth";

import { InitialSettings, ModuleState } from "<state>/__typings__/withSynthState";

const {
  StateProvider,
  stateConsumer
} = createState("synthState");

const withSynthStateConsumer = stateConsumer;

const withSynthStateProvider = (WrappedComponent: React.ComponentType<JSX.IntrinsicAttributes>) => (props: JSX.IntrinsicAttributes): JSX.Element => {
  const initialSettings: InitialSettings = {  
    envelope: {
      attack: 0.1,
      decay: 1,
      release: 0.04,
      sustain: 0.4
    },
    oscillator: {
      count: 4,
      detune: 20,
      type: "sawtooth6"
    }
  };

  const loop = useLoop();
  const polySynth = usePolySynth(initialSettings);

  const moduleState: ModuleState = {
    loop,
    polySynth
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