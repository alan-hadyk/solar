export interface FlexContainerProps {
  alignItems?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
  children: JSX.Element | JSX.Element[];
  dataTestId?: string;
  flexFlow?: "row wrap" | "row nowrap" | "column wrap" | "column nowrap";
  gap?: string;
  height?: string | "unset" | "50%" | "100%";
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between"; 
  maxWidth?: string | "unset"; 
}

export interface CalculateGap {
  flexFlow: FlexContainerProps["flexFlow"];
  gap: FlexContainerProps["gap"];
}