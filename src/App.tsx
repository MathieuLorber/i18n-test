import React from "react";
import "./App.css";
import { MyComponent } from "./MyComponent";
import { Updater } from "./Updater";

function App() {
  return (
    <div className="App">
      <Updater>
        <MyComponent />
      </Updater>
    </div>
  );
}

export default App;
