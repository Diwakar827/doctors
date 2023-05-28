import React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import {  Route, Routes } from "react-router-dom";

import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
 
//import ProtectedRoute from   
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  
  

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}></Route>
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>}></Route>
        <Route path="/register" element={<PublicRoute><Register></Register></PublicRoute>}></Route>
          
       
        <Route path="/home" element={ <ProtectedRoute>
              <Home />
            </ProtectedRoute>}></Route>
         
        
      
        
      </Routes>
    </>
  );
}

export default App;
