import "./App.css";
import { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        The version is: {process.env.REACT_APP_VERSION}
      </header>
      <div>counter: {counter}</div>
      <button onClick={() => setCounter(counter + 1)}>increment</button>
    </div>
  );
}

export default App;
