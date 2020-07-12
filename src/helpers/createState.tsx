import React, { createContext } from "react";

import { CreateState, StateProviderProps } from "<helpers>/__typings__/createState.d.ts";

export default function createState(stateName: string): CreateState {
  const State = createContext(stateName);
    
  function StateProvider({ WrappedComponent, moduleState, otherProps }: StateProviderProps): JSX.Element {
    const state = {};
    state[stateName] = moduleState;
    
    return (
      <State.Provider value={state[stateName]}>
        <WrappedComponent {...otherProps} />
      </State.Provider>
    );
  }

  const stateConsumer = (WrappedComponent: React.ComponentType<JSX.IntrinsicAttributes>) => (props: JSX.IntrinsicAttributes): JSX.Element => (
    <State.Consumer>
      {(moduleState: unknown): JSX.Element => {
        if (!moduleState) {
          throw new Error(
            `${stateName} Consumer must be used within ${stateName} Provider`
          );
        }

        const state = {};
        state[stateName] = moduleState;

        return <WrappedComponent {...props} {...state} />;
      }}
    </State.Consumer>
  );

  return {
    StateProvider,
    stateConsumer
  };
}
