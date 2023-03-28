import LoaderScreen from "components/LoaderScreen/LoaderScreen";
import Dashboard from "Dashboard";
import React from "react";

const App = () => {
 const isInit = true;

 if (isInit) return <Dashboard />;
 else return <LoaderScreen />;
}

export default App;
