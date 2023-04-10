import "./App.css";
import Control from "./components/Control/controlComponent";
import { useInitEmception } from "./helpers/emceptionHooks";
import Terminal from "./components/Console/myTermComponent";

/*
Main app component, initializes emcetion (c++ to wasm in browser compiler) - 
done here because want to do it as soon as possible, returns Control conomponent 
(viewer and options) and terminal component
Wrapped in page container that is max vh for styling 
*/
function App() {
  useInitEmception();
  return (
    <>
      <div id="page-container">
        <Control />
        <Terminal />
      </div>
    </>
  );
}

export default App;
