import React from "react";

import toast from "react-hot-toast";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Logandregister.css";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const registerUser = async(userData) => {
    try {
      const response = await axios.post(
        "https://doctorsking.vercel.app/api/userchecking/register",
        userData
      );
      console.log(response);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div className="authenticationForm card p-2">
        <h1 className="card-title">Welcome to the Health Care</h1>

        <Form layout="vertical" onFinish={registerUser}>
          <Form.Item label="Name" name="name">
            <Input placeholder="enter your name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="password" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form>
        <Link to="/login" className="anchor mt-2">
          Click for Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
