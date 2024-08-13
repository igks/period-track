import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Detail } from "./pages/Detail";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
