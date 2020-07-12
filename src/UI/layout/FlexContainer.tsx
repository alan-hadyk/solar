import React from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";

import {
  CalculateGap,
  FlexContainerProps
} from "<layout>/__typings__/FlexContainer.d.ts";

const FlexContainer = ({
  alignItems = "center",
  dataTestId,
  children,
  flexFlow = "row wrap",
  gap = "0",
  height = "unset",
  justifyContent = "center",
  maxWidth = "unset"
}: FlexContainerProps): JSX.Element => (
  <FlexContainer.Container
    alignItems={alignItems}
    data-testid={dataTestId || "FlexContainer"}
    flexFlow={flexFlow}
    gap={gap}
    height={height}
    justifyContent={justifyContent}
    maxWidth={maxWidth}
  >
    {children}
  </FlexContainer.Container>
);

FlexContainer.Container = styled.div<FlexContainerProps>`
  ${({
    alignItems,
    flexFlow,
    gap,
    height,
    justifyContent,
    maxWidth
  }): FlattenSimpleInterpolation => css`
    align-items: ${alignItems};
    display: flex;
    flex-flow: ${flexFlow};
    height: ${height};
    justify-content: ${justifyContent};
    max-width: ${maxWidth};

    ${gap !== "0" && `
      & > * {
        ${calculateGap({ flexFlow, gap })}
      }
    `} 
  `}
`;

function calculateGap({ flexFlow, gap }: CalculateGap): string {
  switch(flexFlow) {
  case "row nowrap":
    return `
      margin-left: ${gap};

      &:first-child {
        margin-left: 0;
      }  
    `;

  case "row wrap":
    return `
      margin-bottom: ${gap};
      margin-right: ${gap};
    `;

  case "column wrap":
  case "column nowrap":
    return `
      margin-top: ${gap};

      &:first-child {
        margin-top: 0;
      }  
    `;
  }
}
  
export default FlexContainer;