export interface CreateState {
  StateProvider: ({ WrappedComponent, moduleState, otherProps }: StateProviderProps) => JSX.Element;
  stateConsumer: (WrappedComponent: ComponentType<IntrinsicAttributes>) => (props: IntrinsicAttributes) => JSX.Element;
}

export interface StateProviderProps {
  WrappedComponent: React.ComponentType<JSX.IntrinsicAttributes>;
  moduleState: JSX.IntrinsicAttributes;
  otherProps: JSX.IntrinsicAttributes;
}