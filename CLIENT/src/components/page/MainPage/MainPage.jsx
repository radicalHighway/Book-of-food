
import RecieptCard from '../../widgets/RecieptCard/RecieptCard'
 import './MainPage.css'; 
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../shared/lib/axiosInstance';
import { Row, Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';


export default function MainPage() {

  const [reciepts, setReciepts] = useState([])
console.log(reciepts);

const sortTimeHenle = (e) => {
  e.preventDefault();
  setReciepts(reciepts.sort((a,b) => a.time.localeCompare(b.time)))
}
  
  useEffect(() => {
      const getRecipts = async () =>
          { const allReciepts = await axiosInstance.get('/reciepts/')
              setReciepts(allReciepts.data)
          } 
      getRecipts()
  }, [])

  return (
    <>
     <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown-button">
          Отсортировать
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={sortTimeHenle} >По увеличению времени приготовления</Dropdown.Item>
          <Dropdown.Item href="#/action-2">По количеству ингридиентов</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

    <Row className="g-4">
         {reciepts.map((el) => (
           <Col xs={12} md={6} lg={4} key={el.id}>
             <RecieptCard reciept={el} />
           </Col>
         ))}
       </Row>
       </>
  )
}
