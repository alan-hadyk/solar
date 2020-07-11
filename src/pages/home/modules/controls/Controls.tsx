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
  const { loop, polySynth } = synthState || {};
  const { bpm, loopInstance, loopState, setBpm, startLoop, stopLoop } = loop || {};
  const { polySynthInstance } = polySynth || {};

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
          onClick={stopLoop}
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
    loopInstance.callback = (time: number): void => {
      polySynthInstance.triggerAttackRelease(["A4", "C5"], "8n", time);
      polySynthInstance.triggerAttackRelease(["F4"], "8n", time + 0.5);
      polySynthInstance.triggerAttackRelease(["C4"], "8n", time + 1);
      polySynthInstance.triggerAttackRelease(["E4"], "8n", time + 1.5);
      console.log("new callback", time);
      // polySynthInstance.triggerAttackRelease(["E4"], "8n", "+24n");
      // polySynthInstance.triggerAttackRelease(["C4", "E4", "G4"], "16n", time);
      // polySynthInstance.triggerAttackRelease(["E4", "G#4", "B4"], "16n", time);
    };

    startLoop("#startLoopButton");
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