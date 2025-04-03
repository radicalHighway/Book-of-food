import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./RecieptCard.css";
import { useNavigate } from "react-router";
import axiosInstance from "../../shared/lib/axiosInstance";

export default function RecieptCard({ user, reciept }) {
  const [ingridients, setIngidients] = useState([]);
  const navigate = useNavigate();

  const favouriteHandler = async () => {
    try {
      await axiosInstance.post(
        `favorites/reciept/${reciept.id}/users/${user.data.id}/likes`
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (reciept.ingridients) {
      setIngidients(reciept.ingridients.split(","));
    }
  }, [reciept.ingridients]);

  return (
    <>
      <Card style={{ width: "18rem", position: "relative" }}>
        <Card.Img variant="top" src={reciept.url} />
        <Card.Body>
          <Card.Title>{reciept.name} </Card.Title>
          <Button as={Link} to={`/${reciept.id}`} variant="primary">
            Подробнее
          </Button>
        </Card.Body>
        <div style={{ margin: "0 10px" }}>
          <i
            className="fas fa-utensils"
            style={{ marginRight: "5px", marginBottom: "13px" }}
          ></i>
          <span style={{ fontSize: "12px" }}>
            {ingridients.length} ингредиентов
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <i className="fas fa-clock" style={{ marginRight: "5px" }}></i>
          <span style={{ fontSize: "12px" }}>{reciept.time} минут</span>
        </div>
        <Button
          onClick={favouriteHandler}
          variant="outline-danger"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            border: "0px",
            padding: "5px",
          }}
        >
          ❤️
        </Button>
      </Card>
    </>
  );
}
