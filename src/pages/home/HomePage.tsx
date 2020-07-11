import React, { Fragment } from "react";

// import Oscillator from "<pages>/home/modules/oscillator/Oscillator";
import Controls from "<pages>/home/modules/controls/Controls";

import { withSynthStateProvider } from "<state>/withSynthState";

const Home = (): JSX.Element => (
  <Fragment>
    {/* <Oscillator /> */}
    <Controls />
  </Fragment>
);


export default withSynthStateProvider(Home);
