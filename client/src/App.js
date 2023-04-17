
import React from "react";
import Login from "./pages/Login";
import { Route,Routes } from "react-router-dom";
import Register from "./pages/Register";
function App() {
  return (
     
    <Routes>
     <Route path="/login" element={<Login />}></Route>
     <Route path="/register" element={<Register></Register>}></Route>
    </Routes>
   
    
  );
}

export default App;
