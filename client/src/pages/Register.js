import React from 'react';

import { Button, Form, Input } from "antd";
import { Link} from "react-router-dom";
import '../styles/Logandregister.css';

const Register = () => {
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
            <Button type="primary" htmlType="submit">Register</Button>
          </Form>
          <Link to='/login' className="anchor mt-2" >Click for Login</Link>
        </div>
      </div>
    );
};

export default Register;