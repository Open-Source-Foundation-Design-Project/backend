import "./App.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";


import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;