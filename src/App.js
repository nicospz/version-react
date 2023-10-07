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
      <div>The version is: {process.env.REACT_APP_VERSION}</div>
      <div>Deploy a new version and see it update automatically!</div>
      <div className="Counter">
        <div>React working flawlessly 👉</div>
        <div>
          <button onClick={() => setCounter(counter + 1)}>+</button>
          Counter: {counter}{" "}
        </div>
      </div>
      <div className="LoadDynamicComponent">
        Open the Network tab and click the button below to see the dynamic
        component being loaded:
        <button onClick={loadDynamicComponent}>Load Dynamic Component</button>
        {DynamicComponent && (
          <Suspense fallback={<div>Loading...</div>}>
            <DynamicComponent />
          </Suspense>
        )}
      </div>
      <div className="VersionList">
        <div>Click on a version to see it loaded by Django:</div>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((version) => (
          <a key={version} href={`/ink/test-poc?fe_version=${version}`}>
            {version}
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
