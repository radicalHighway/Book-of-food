import React from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import axiosInstance, { setAccessToken } from '../shared/lib/axiosInstance';
import { Container } from 'react-bootstrap';
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
    })
    .catch((error) => {
      if (error.response?.status === 401 || error.response?.status === 400) {
        alert("Неверный email или пароль");
      } else {
        alert("Ошибка сервера");
      }
    })
  }
  return (
    <Container className="d-flex justify-content-center ">
    <Form onSubmit={loginHandler} style={{width:'500px', marginTop: '90px'}}>
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
    </Container>
  )
}
