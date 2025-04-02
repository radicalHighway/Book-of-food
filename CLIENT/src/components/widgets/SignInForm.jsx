import React from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import axiosInstance, { setAccessToken } from '../shared/lib/axiosInstance';

export default function SignInForm({setUser}) {
  const navigate = useNavigate();
  const loginHandler = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    if (!formData.email || !formData.password) {
      return alert("Missing required fields");
    }
    axiosInstance.post("/auth/login", formData).then((res) => {
      setUser({ status: "logged", data: res.data.user });
      setAccessToken(res.data.accessToken);
      navigate("/");
    });
  }
  return (
    <Form onSubmit={loginHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          
           name='email' 
           placeholder='email'
           
           required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
           
           name='password' 
           placeholder='password'
         
           type='password'
           required
           autoComplete="on"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Войти
      </Button>
    </Form>
  )
}
