import React from 'react';
import { Button, Form, Input } from "antd";
import { Link} from "react-router-dom";
import '../styles/Logandregister.css';

const Login = () => {
    return (
        
        <div className="authentication">
        <div className="authenticationForm card p-2" >
          <h1 className="card-title">Welcome to the Health Care</h1>
  
          <Form layout="vertical" >
         
             <Form.Item label="Email" name="email">
              <Input placeholder="email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input placeholder="password" />
            </Form.Item>
            <Button type="primary" htmlType="submit">Login</Button>
          </Form>
          <Link to='/register' className="anchor mt-2" >FirstTime?Click for Register</Link>
        </div>
      </div>
    );
};

export default Login;