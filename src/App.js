import "./App.css";
import Viewer from "./components/Viewer/viewerComponent";
import Control from "./components/Control/controlComponent";
import { useInitEmception } from "./helpers/emceptionHooks";
import useCgen from "./helpers/cgenHook";
import Console from "./components/Console/consoleComponent";
import Terminal from "./components/Console/myTermComponent";

function App() {
  useInitEmception();
  return (
    <>
      <div id="page-container">
        <Control />
        {/* <Viewer xRes={3840} yRes={2160} /> */}
        {/* <Console /> */}
        <Terminal />
      </div>
    </>
  );
}

export default App;
