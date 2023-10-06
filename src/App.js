import { useState, Suspense } from "react";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);
  const [DynamicComponent, setDynamicComponent] = useState(null);

  const loadDynamicComponent = async () => {
    const module = await import("./DynamicComponent"); // Adjust the path to your component
    setDynamicComponent(() => module.default);
  };

  return (
    <div className="App">
      <header className="App-header">
        The version is: {process.env.REACT_APP_VERSION}
      </header>
      <div>counter: {counter}</div>
      <button onClick={() => setCounter(counter + 1)}>increment</button>
      <button onClick={loadDynamicComponent}>Load Dynamic Component</button>
      {DynamicComponent && (
        <Suspense fallback={<div>Loading...</div>}>
          <DynamicComponent />
        </Suspense>
      )}
    </div>
  );
}

export default App;
