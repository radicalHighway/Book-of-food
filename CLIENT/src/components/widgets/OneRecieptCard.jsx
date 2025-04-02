import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../shared/lib/axiosInstance';

export default function OneRecieptCard() {
  const [reciept, setReciept] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getReciept = async () => {
      try {
        const allReciepts = await axiosInstance.get('/reciepts/');
        const result = allReciepts.data.find(el => el.id === Number(id));
        setReciept(result || null);
      } catch (error) {
        console.error('Ошибка загрузки рецепта:', error);
      }
    };
    getReciept();
  }, [id]);

  if (!reciept) {
    return <p>Загрузка рецепта...</p>;
  }

  return (
    <Card style={{ width: '80rem' }}>
      {reciept.url && <Card.Img variant='top' src={reciept.url} style={{width:"180px", height:"80px"}}/>}
      <Card.Body>
        <Card.Title>{reciept.name}</Card.Title>
        <Card.Text>Ингредиенты: {reciept.ingridients}</Card.Text>
      </Card.Body>
      <ListGroup className='list-group-flush'>
        <ListGroup.Item>Время приготовления: {reciept.time}</ListGroup.Item>
        <ListGroup.Item>
          Инструкция по приготовлению: {reciept.instruction}
        </ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href='/'>Назад</Card.Link>
        {/* <Card.Link href=`/${id+1}`>далее</Card.Link> */}
      </Card.Body>
      <Button
        variant='outline-danger'
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          border: '0px',
          padding: '5px',
        }}>
        ❤️
      </Button>
    </Card>
  );
}
