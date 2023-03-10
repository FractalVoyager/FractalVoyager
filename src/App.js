import "./App.css";
import Viewer from "./components/Viewer/viewerComponent";
import Control from "./components/Control/controlComponent";
import { useInitEmception } from "./helpers/emceptionHooks";

function App() {
  useInitEmception();

  return (
    <>
      {/* <Viewer xRes={3840} yRes={2160} /> */}
      <Control />
    </>
  );
}

export default App;
