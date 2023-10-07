import { useState, Suspense, useEffect } from "react";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);
  const [DynamicComponent, setDynamicComponent] = useState(null);

  const loadDynamicComponent = async () => {
    const module = await import("./DynamicComponent"); // Adjust the path to your component
    setDynamicComponent(() => module.default);
  };

  const [versions, setVersions] = useState([]);
  useEffect(() => {
    fetch("https://worker-noisy-butterfly-35a2.nicolas-espinoza.workers.dev/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setVersions(data.versions);
      });
  }, []);

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
        <div>
          The below list of versions is being fetched from the Cloudflare
          database.
        </div>
        <div>Click on one to see it loaded by Django:</div>
        {versions.map((version) => (
          <a key={version} href={`/ink/test-poc?fe_version=${version}`}>
            {version}
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
