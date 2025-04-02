
import RecieptCard from '../../widgets/RecieptCard/RecieptCard'
// import './MainPage.css'; 
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../shared/lib/axiosInstance';
import { Row, Col } from 'react-bootstrap';


export default function MainPage() {

  const [reciepts, setReciepts] = useState([])

  console.log(reciepts);
  
  useEffect(() => {
      const getRecipts = async () =>
          { const allReciepts = await axiosInstance.get('/reciepts/')
              setReciepts(allReciepts.data)
          } 
      getRecipts()
  }, [])

  return (
    <Row className="g-4">
         {reciepts.map((el) => (
           <Col xs={12} md={6} lg={4} key={el.id}>
             <RecieptCard reciept={el} />
           </Col>
         ))}
       </Row>

  )
}
