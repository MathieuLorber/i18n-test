import React from "react";
import "./App.css";
import { Updater } from "./Updater";
import { MyComponent } from "./MyComponent";

function App() {
  return (
    <Updater>
      <MyComponent />
    </Updater>
  );
}

export default App;
