import React, { useState, useEffect } from "react";
import Wad from "web-audio-daw";

import createState from "<helpers>/createState";

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

// const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const withSynthStateProvider = (WrappedComponent: React.ComponentType<JSX.IntrinsicAttributes>) => (props: JSX.IntrinsicAttributes): JSX.Element => {
  const [loopState, setLoopState] = useState<string>("stopped");
  const [bpm, setBpm] = useState<number>(100);

  useEffect(() => {
    // const sine     = new Wad({ source : "sine" });
    const square   = new Wad({
      source: "square",
      tuna: {
        Chorus: {
          //0 to 180
          bypass: 0,
          intensity: 0.3,
          //0 to 1
          rate: 4,
          //0.001 to 8
          stereoPhase: 0
        },
        Overdrive: {
          //0 to 1
          algorithmIndex: 0,
          //0 to 5, selects one of our drive algorithms
          bypass: 0,
          //0 to 1
          curveAmount: 1,
          //0 to 1+
          drive: 0.7,
          outputGain: 0.5
        }
      }
    });
    const sawtooth = new Wad({ source : "sawtooth" });

    const tripleOscillator = new Wad.Poly({
      filter: {
        frequency: 8000,
        q: 0,
        type: "lowpass"
      }
    });

    tripleOscillator.add(square).add(sawtooth);
    tripleOscillator.setVolume(.25);

    interface Notes {
      48: string; 49: string; 50: string; 51: string; 52: string; 53: string; 54: string; 55: string; 56: string; 57: string; 58: string; 59: string;
    }

    const notes: any = {
      "48": "C3",
      "49": "Db3",
      "50": "D3",
      "51": "Eb3",
      "52": "E3",
      "53": "F3",
      "54": "Gb3",
      "55": "G3",
      "56": "Ab3",
      "57": "A3",
      "58": "Bb3",
      "59": "B3",
      "60": "C4",
      "61": "Db4",
      "62": "D4",
      "63": "Eb4",
      "64": "E4",
      "65": "F4",
      "66": "Gb4",
      "67": "G4",
      "68": "Ab4",
      "69": "A4",
      "70": "Bb4",
      "71": "B4"
    };

    Wad.assignMidiMap((event: any) => {
      const { data } = event || {};
      console.log(data);

      const [press, note, velocity] = data || {};

      if (press === 128) {
        tripleOscillator.play({
          env: {
            attack: 0,
            hold: .5,
            release: 0
          },
          pitch: notes[String(note)]
        });
      }
    }, 1);  
      
  }, []);

  const sequence = useSequence(initialSequence);
  const polySynth = usePolySynth(initialSettings);

  const moduleState: ModuleState = {
    bpm,
    loopState,
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