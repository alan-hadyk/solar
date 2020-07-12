import React from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";

import FlexContainer from "<layout>/FlexContainer";

import { withSynthStateConsumer } from "<state>/withSynthState";

import { SynthState } from "<state>/__typings__/withSynthState";

// const randomElementFromArray = (arr: string[]): string => arr[Math.floor(Math.random() * arr.length)];
  
const sequencerColumn: string[] = ["C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4"];
const sequencerGrid: string[][] = [
  sequencerColumn,
  sequencerColumn,
  sequencerColumn,
  sequencerColumn,
  sequencerColumn,
  sequencerColumn,
  sequencerColumn,
  sequencerColumn,
  sequencerColumn,
  sequencerColumn,
  sequencerColumn,
  sequencerColumn,
  sequencerColumn,
  sequencerColumn,
  sequencerColumn,
  sequencerColumn
];

interface SquareProps {
  isActive: boolean;
}

const Square = styled.div<SquareProps>`
${({
    isActive
  }): FlattenSimpleInterpolation => css`
    align-items: center;
    background: ${isActive ? "#1976d2" : "#fff"};
    border: ${isActive ? "1px solid #1976d2" : "1px solid black"};
    cursor: pointer;
    display: inline-flex;
    font-size: 10px;
    height: 35px;
    justify-content: center;
    width: 35px;
  `}
`;

function Sequencer({ synthState }: SynthState): JSX.Element {
  const { sequence } = synthState || {};
  const { sequenceNotes, updateSequence } = sequence || {};

  console.log("sequenceNotes", sequenceNotes);

  return (
    <FlexContainer 
      alignItems="center" 
      justifyContent="center"
      maxWidth="850px"
    >
      {sequencerGrid.map((gridColumn, index) => (
        <FlexContainer 
          flexFlow="column nowrap"
          key={`gridColumn-${index}`}
        >
          {gridColumn.map((note, itemIndex) => (
            <Square 
              isActive={sequenceNotes[index] && sequenceNotes[index].includes(note)}
              key={`note-${itemIndex}`}
              onClick={(): void => updateSequence(note, index)}
            >
              {note}
            </Square>
          ))}
        </FlexContainer>
      ))}
    </FlexContainer>
  );
}

export default withSynthStateConsumer(Sequencer);
