import RecieptCard from "../../widgets/RecieptCard/RecieptCard";
import "./MainPage.css";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../shared/lib/axiosInstance";
import { Row, Col } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Pagination from 'react-bootstrap/Pagination';

export default function MainPage({ user }) {
  const [reciepts, setReciepts] = useState([]);
  const [sortRecipts, setSortRecipts] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  
  useEffect(() => {
    const getRecipts = async () => {
      const allReciepts = await axiosInstance.get("/reciepts/");
      setReciepts(allReciepts.data);
      setSortRecipts([])
    };
    getRecipts();
  }, []);

  const sortTimeHenle = (e) => {
    e.preventDefault();
    const sorted = [...reciepts].sort((a, b) => {
      const [hoursA, minutesA] = a.time.split(':').map(Number);
      const [hoursB, minutesB] = b.time.split(':').map(Number);
      const totalMinutesA = hoursA * 60 + minutesA;
      const totalMinutesB = hoursB * 60 + minutesB;
      return totalMinutesA - totalMinutesB;
    })
    setSortRecipts(sorted);
  }

  const sortTimeDescendingHandle = (e) => {
    e.preventDefault();
    const sorted = [...reciepts].sort((a, b) => {
      const [hoursA, minutesA] = a.time.split(':').map(Number);
      const [hoursB, minutesB] = b.time.split(':').map(Number);
      const totalMinutesA = hoursA * 60 + minutesA;
      const totalMinutesB = hoursB * 60 + minutesB;
      return totalMinutesB - totalMinutesA;
    })
    setSortRecipts(sorted)
  }

const sortIngridientHandle = (e) => {
  e.preventDefault();
  const sorted = [...reciepts].sort((a,b) => {
    return a.ingridients.split(',').length - b.ingridients.split(',').length
  }) 
  setSortRecipts(sorted)
}

const sortIngridientDescendingHandle = (e) => {
  e.preventDefault();
  const sorted = [...reciepts].sort((a,b) => {
    return b.ingridients.split(',').length - a.ingridients.split(',').length
  }) 
  setSortRecipts(sorted)
}

const indexOfLastReciept = currentPage * itemsPerPage;
const indexOfFirstReciept = indexOfLastReciept - itemsPerPage;
const currentReciepts = (sortRecipts.length > 0 ? sortRecipts : reciepts).slice(indexOfFirstReciept, indexOfLastReciept);

const totalPages = Math.ceil((sortRecipts.length > 0 ? sortRecipts : reciepts).length / itemsPerPage);

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};



  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          className="dropdown-button"
        >
          Отсортировать
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={sortTimeHenle} >По увеличению времени приготовления</Dropdown.Item>
          <Dropdown.Item onClick={sortTimeDescendingHandle} >По уменьшению времени приготовления</Dropdown.Item>
          <Dropdown.Item onClick={sortIngridientHandle}>По увеличению количества ингридиентов</Dropdown.Item>
          <Dropdown.Item onClick={sortIngridientDescendingHandle} >По уменьшению количества ингридиентов</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Row className="g-4">
      {currentReciepts.map((el) => (
          <Col xs={12} md={6} lg={4} key={el.id}>
            <RecieptCard user={user} reciept={el} />
          </Col>
        ))}
      </Row>
      <br/>
      <div className="pagination-container">

<Pagination>
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)} />

        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
      </Pagination>
      </div>

    </>
  );
}
