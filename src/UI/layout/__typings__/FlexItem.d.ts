export interface FlexItemProps {
  alignSelf?: "auto" | "flex-start" | "flex-end" | "center" | "baseline" | "stretch"; 
  children: JSX.Element | JSX.Element[];
  className?: string;
  dataTestId?: string;
  flex: string;
  height?: string;
  order?: number;
  overflow?: string;
  paddingBottom?: string;
  paddingTop?: string;
}
