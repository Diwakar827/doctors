import React from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Logandregister.css";
import axios from "axios";
import toast from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "https://doctorsking.vercel.app/api/userchecking/login",
        values
      );

      console.log(response);

      if (response.data.success) {
        console.log(response.data.token);
        toast.success(response.data.message);
        toast.success("navigating to home page");
            
        localStorage.setItem('token', response.data.token);

          navigate("/home");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div className="authenticationForm card p-2">
        <h1 className="card-title">Welcome to the Health Care</h1>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="password" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form>
        <Link to="/register" className="anchor mt-2">
          FirstTime?Click for Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
