import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FcLike } from "react-icons/fc";
import { Link } from "react-router";
import axiosInstance from "../shared/lib/axiosInstance";

export default function FavoriteCard({
  reciept,
  user,
  setReciept,
  updateFavoritesCount,
}) {
  const [ingridients, setIngidients] = useState([]);

  const delHandler = async () => {
    try {
      await axiosInstance.delete(`/favorites/${reciept.id}`);
      setReciept((prev) => prev.filter((el) => el.id !== reciept.id));
      updateFavoritesCount();
    } catch (error) {}
  };

  useEffect(() => {
    if (reciept.ingridients) {
      setIngidients(reciept.ingridients.split(","));
    }
  }, [reciept.ingridients]);
  return (
    <>
      <Card style={{ width: "18rem", position: "relative"}}>
        <Card.Img variant="top" src={reciept.url} />
        <Card.Body>
          <Card.Title>{reciept.name} </Card.Title>
          <Button as={Link} to={`/${reciept.id}`} variant="outline-success">
            Подробнее
          </Button>
          <Button onClick={delHandler} variant="outline-success">
            Убрать из избранного
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
        {user.status === "logged" && (
          <Button
            variant="outline-danger"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              border: "0",
              padding: "5px",
            }}
          >
            <FcLike />
          </Button>
        )}
      </Card>
    </>
  );
}
