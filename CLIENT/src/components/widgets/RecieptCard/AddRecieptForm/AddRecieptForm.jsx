import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import axiosInstance from '../../../shared/lib/axiosInstance';
import Alert from 'react-bootstrap/Alert';
import './AddRecieptForm.css';


export default function AddRecieptForm({ user,setReciepts }) {
    const [recieptForm, setRecieptForm] = useState({name:'', time:'',ingridients:'',instruction:'', url:'', usr_id: ''})
    const [showAlert, setShowAlert] = useState(false);
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setRecieptForm({ ...recieptForm, [name]: value });
  };


const submitHandle = async (e) => {
  e.preventDefault();
  try {
    const newReci = await axiosInstance.post("/reciepts/", recieptForm);
    setRecieptForm({
      name: '',
      time: '',
      ingridients: '',
      instruction: '',
      url: ''
  });
  setReciepts((per) => [...per, newReci.data])
  setShowAlert(true); 
            setTimeout(() => setShowAlert(false), 3000);
  } catch (error) {
    console.error('Ошибка сети', error);
  }

}

  return (
   
     <div className="form-container"> 
    {showAlert && <Alert variant="success">Рецепт успешно добавлен</Alert>} 

    <Form onSubmit={submitHandle}>
    <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default" name='name'>
            Название блюда
        </InputGroup.Text>
        <Form.Control
            name='name'
            value={recieptForm.name}
            onChange={handleChange}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
        />
    </InputGroup>
    <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default" name='time'>
            Время приготовления
        </InputGroup.Text>
        <Form.Control
            name='time'
            type='time'
            value={recieptForm.time}
            onChange={handleChange}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
        />
    </InputGroup>
    <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default" name='ingridients'>
            Ингредиенты
        </InputGroup.Text>
        <Form.Control
            name='ingridients'
            value={recieptForm.ingridients}
            onChange={handleChange}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
        />
    </InputGroup>
    <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default" name='instruction'>
            Приготовление
        </InputGroup.Text>
        <Form.Control
            name='instruction'
            value={recieptForm.instruction}
            onChange={handleChange}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
        />
    </InputGroup>
    <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default" name='url'>
            Ссылка на картинку
        </InputGroup.Text>
        <Form.Control
            name='url'
            value={recieptForm.url}
            onChange={handleChange}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
        />
    </InputGroup>
    <Button variant="success" type="submit" size="lg">
    Добавить рецепт
            </Button>
        </Form>
        </div>

    )
}
