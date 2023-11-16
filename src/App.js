import "./App.css";
import BlockTest from "./Components/BlockTest";
import TesterView from "./Components/TesterView";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layouts } from "./Layouts/Layouts";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TesterView />} />
          <Route path="/test/:id" element={<BlockTest />} />
          <Route path="/thanks-screen" element={<Layouts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
