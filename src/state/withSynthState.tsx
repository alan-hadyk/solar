import React from "react";

import createState from "<helpers>/createState";

const {
  StateProvider,
  stateConsumer
} = createState("synthState");

const withSynthStateConsumer = stateConsumer;

const withSynthStateProvider = (WrappedComponent: React.ComponentType<JSX.IntrinsicAttributes>) => (props: JSX.IntrinsicAttributes): JSX.Element => {
  const moduleState = {};

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