import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        The version is: {process.env.REACT_APP_VERSION}
      </header>
    </div>
  );
}

export default App;
