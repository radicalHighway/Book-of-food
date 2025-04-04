import React from 'react'
import axiosInstance from '../shared/lib/axiosInstance'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import { Container } from 'react-bootstrap';


export default function SignUpForm({setUser}) {
    const navigate = useNavigate();
    // проверка пароля 
    const validatePassword = (password) => {
      if (password.length < 8) {
        return 'Пароль должен содержать минимум 8 символов'
      }
      if (!/[A-Z]/.test(password)) {
        return 'Пароль должен содержать хотя бы одну заглавную букву';
      }
      if (!/[a-z]/.test(password)) {
        return 'Пароль должен содержать хотя бы одну строчную букву';
      }
      if (!/^[A-Za-z0-9]+$/.test(password)) {
        return 'Пароль должен содержать только латинские буквы и цифры';
      }
      return null;
    }
    
    const signUpHandler = (e) => {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(e.target));
      const {password} = formData
      if (!formData.email || !formData.password || !formData.name) {
        return alert("Missing required fields"); // проверка пустых полей
      }
      // валидация пароля
      const passwordError = validatePassword(password);
    if (passwordError) {
      alert(passwordError); // Показываем ошибку пароля
      return;
    }
      // отправка данных на сервер
      axiosInstance
        .post("auth/signup", formData)
        .then((res) => {  // Успешный ответ
          setUser({ status: "logged", data: res.data.user }); 
          navigate("/");
        })
        .catch((error) => {
          if (error.response) {
            // Если есть ответ от сервера
            if (error.response.status === 400 || error.response.status === 409) {
              // Проверяем текст ошибки от сервера
              if (error.response.data.error === 'User already exists' || 
                  error.response.data.message === 'User already exists') {
                alert('Пользователь с таким email уже зарегистрирован');
              } else {
                alert(error.response.data.error || 'Введите допустимый адрес электронной почты. Например xxxx@gmail.com');
              }
            } else if (error.response.status === 500) {
              alert('Ошибка сервера. Попробуйте позже');
            }
          } else {
            // Если нет ответа от сервера (проблемы с сетью)
            alert('Произошла ошибка. Проверьте подключение к интернету');
          }
        })
  };
    return (
      <Container className="d-flex justify-content-center ">
      
      <Form  onSubmit={signUpHandler} style={{width:'500px', marginTop: '90px'}}>
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
           <Form.Text >
          Требования: минимум 8 символов, заглавные и строчные латинские буквы
        </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" >
          Зарегистрироваться
        </Button>
      </Form>
      </Container>
    )
  }