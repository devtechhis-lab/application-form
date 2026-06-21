import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Example from "@/example";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/example" element={<Example />} />
    </Routes>
  );
}

export default App;
