import logo from "./logo.svg";
import "./App.css";
import Comment from "./component/Comment";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home.jsx";
import { createContext } from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comment/:id" element={<Comment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
