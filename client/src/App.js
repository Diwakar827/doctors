import React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import {  Route, Routes } from "react-router-dom";

import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";

function App() {
  
  

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
         
        <Route path="/home" element={<Home></Home>}></Route>
         
        
      
        
      </Routes>
    </>
  );
}

export default App;
