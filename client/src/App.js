import React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import {  Route, Routes } from "react-router-dom";

import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
 
//import ProtectedRoute from   
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import ApplyDoctor from './pages/Applydoctor';
import Notifications from "./pages/Notifications";
import UsersList from "./pages/Admin/UsersList";
import DoctorsList from "./pages/Admin/DoctorsList";
import Profile from "./pages/Doctor/Profile";
import BookAppointment from "./pages/BookAppointment";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";

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
          
            <Route
          path="/apply-doctor"
          element={
            <ProtectedRoute>
              <ApplyDoctor />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
             <Notifications></Notifications>
            </ProtectedRoute>
          }
        />
         
         <Route
          path="/users"
          element={
            <ProtectedRoute>
             <UsersList></UsersList>
            </ProtectedRoute>
          }
        />
         
         <Route
          path="/doctors"
          element={
            <ProtectedRoute>
             <DoctorsList></DoctorsList>
            </ProtectedRoute>
          }
        />

    <Route
          path="/doctor/profile/:doctorid"
          element={
            <ProtectedRoute>
             <Profile></Profile>
            </ProtectedRoute>
          }
        />

<Route
          path="/book-appointment/:doctorId"
          element={
            <ProtectedRoute>
             <BookAppointment></BookAppointment>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
            <Appointments></Appointments>
            </ProtectedRoute>
          }
        />


    <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute>
            <DoctorAppointments></DoctorAppointments>
            </ProtectedRoute>
          }
        />
      
        
      </Routes>
    </>
  );
}

export default App;
