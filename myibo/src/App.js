import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import MyPage from "./components/MyPage";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/MyPage" element={<MyPage />} /> 
      </Routes>
      <Footer />
      </Router>
      
    </>
  );
    

}

export default App;
