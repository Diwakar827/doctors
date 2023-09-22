import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";


function Doctor({ doctor }) {
  const navigate = useNavigate();

  //  className="card p-2 cursor-pointer"
  return (
    <div
      className="box"
      
    >
     <img src="https://static.vecteezy.com/system/resources/previews/002/896/807/non_2x/female-doctor-using-her-digital-tablet-free-vector.jpg" alt=""></img>
    
      <h1 className="card-title">
        {doctor.firstName} {doctor.lastName}
      </h1>
     
      <p>
        <b>Phone Number : </b>
        {doctor.phoneNumber}
      </p>
      <p>
        <b>Address : </b>
        {doctor.address}
      </p>
      <p>
        <b>Fee per Visit : </b>
        {doctor.feePerCunsultation}
      </p>
      <p>
        <b>Timings : </b>
        {doctor.timings[0]} - {doctor.timings[1]}
      </p>
    

      <button className="btn" onClick={() => navigate(`/book-appointment/${doctor._id}`)}>Book now <span><i class="ri-send-plane-2-fill"></i></span></button>
    </div>

     
  );
}

export default Doctor;
