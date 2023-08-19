import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import React from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";
import moment from "moment";

function ApplyDoctor() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      console.log(values);
      console.log( moment(values.timings[0]).format("HH:mm"));
     
      const response = await axios.post(
        "https://doctors-server-nu.vercel.app/api/userchecking/applydoctor",
        {
          ...values,
         userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
          
        },
        {
          headers:{
              // eslint-disable-next-line no-useless-concat
              Authorization:'Bearer'+" "+localStorage.getItem('token')
          }
        }
      );
      console.log(response);
     // dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
         
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
     // dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
        <h1 className="page-title">Apply Doctor</h1>
      
        <hr />
       <DoctorForm onFinish={onFinish} />

      </Layout>
   
  );
}

export default ApplyDoctor;