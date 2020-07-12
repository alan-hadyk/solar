import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";

import { withSynthStateConsumer } from "<state>/withSynthState";

import { SynthState } from "<state>/__typings__/withSynthState";

const useStyles = makeStyles({
  root: {
    width: 200
  }
});

function Controls({ synthState }: SynthState): JSX.Element {
  const classes = useStyles();
  const { bpm, sequence, polySynth, setLoopState, loopState, setBpm } = synthState || {};
  const { polySynthInstance } = polySynth || {};
  const { sequenceInstance, startSequence, stopSequence } = sequence || {};

  console.log("sequenceInstance", sequenceInstance);
  return (
    <div className={classes.root}>
      <ButtonGroup variant="contained" color="primary">
        <Button
          disabled={loopState !== "stopped"} 
          id="startLoopButton" 
          onClick={start}
        >
          Start
        </Button>
        <Button 
          disabled={loopState === "stopped"} 
          onClick={stop}
        >
          Stop
        </Button>
      </ButtonGroup>
      <hr />
      <Typography gutterBottom>
          BPM: {bpm}
      </Typography>
      <Slider 
        min={0}
        max={200}
        value={bpm} 
        onChange={updateBpm} />
    </div>
  );

  function start(): void {
    sequenceInstance.callback = (time: number, note: string): void => {
      polySynthInstance.triggerAttackRelease(note, "4n", time);
      console.log("new callback", time, note);
    };

    startSequence("#startLoopButton");
    setLoopState("started");
  }

  function stop(): void {
    stopSequence();
    setLoopState("stopped");
  }

  function updateBpm(_event: React.ChangeEvent<{}>, value: number | number[]): void {
    if (Array.isArray(value)) {
      setBpm(value[0]);
    } else {
      setBpm(value);
    }
  }
}

export default withSynthStateConsumer(Controls);