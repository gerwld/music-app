import LoaderScreen from "components/LoaderScreen/LoaderScreen";
import React from "react";
import {Dashboard} from "components";

const App = () => {
 const isInit = true;

 if (isInit) return <Dashboard />;
 else return <LoaderScreen />;
}

export default App;
