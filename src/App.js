import "./App.css";
import BlockTest from "./Components/BlockTest";
import TesterView from "./Components/TesterView";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TesterView />} />
          <Route path="/test/:id" element={<BlockTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
