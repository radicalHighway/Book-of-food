import React from 'react'
import axiosInstance from '../shared/lib/axiosInstance'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';

export default function SignUpForm({setUser}) {
    const navigate = useNavigate();
    
    const signUpHandler = (e) => {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(e.target));
      if (!formData.email || !formData.password || !formData.name) {
        return alert("Missing required fields");
      }
      axiosInstance
        .post("auth/signup", formData)
        .then((res) => {
          setUser({ status: "logged", data: res.data.user });
          navigate("/");
        })
        .catch((error) => {
          error.status === 400
            ? alert("Такой пользователь уже существует")
            : true;
          error.status === 500 ? alert("Ошибка сервера") : true;
        });
      }
    return (
      <Form onSubmit={signUpHandler}>
        <Form.Group className="mb-3" controlId="formBasicLogin">
          <Form.Label>Login</Form.Label>
          <Form.Control 
            
             name='name' 
             placeholder='login'
            //  value={userInputs.login}
             required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicMail">
        <Form.Label>Email</Form.Label>
          <Form.Control 
             
             name='email' 
             placeholder='email'
            //  value={userInputs.email}
             type='email'
             required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
             
             name='password' 
             placeholder='password'
            //  value={userInputs.password}
             type='password'
             required
             autoComplete="on"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Добавить пользователя
        </Button>
      </Form>
    )
  }