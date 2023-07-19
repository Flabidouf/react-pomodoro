import Timer from "./Timer.jsx";
import ControlButtons from "./ControlButtons.jsx";
import Display from "./Display.jsx";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <Timer />
        <ControlButtons />
        <Display />
      </div>
    </>
  );
}

export default App;

// Next step :
// Use pico.css
// Do so that the original timer is incremented. Only when it is stopped.
// A spotify webplayer
