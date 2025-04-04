import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import "./RecieptCard.css";
import axiosInstance from "../../shared/lib/axiosInstance";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";

export default function RecieptCard({
  user,
  reciept,
  countHandler,
  setReciepts,
}) {
  const [ingridients, setIngidients] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfLiked = async () => {
      if (user.status === "logged") {
        try {
          const response = await axiosInstance.get(
            `/favorites/users/${user.data.id}/likes`
          );
          const isRecipeLiked = response.data.some(
            (item) => item.id === reciept.id
          );
          setIsLiked(isRecipeLiked);
        } catch (error) {
          console.error("Error checking like status:", error);
        }
      }
    };

    checkIfLiked();

    if (reciept.ingridients) {
      setIngidients(reciept.ingridients.split(","));
    }
  }, [reciept, user]);

  const favouriteHandler = async () => {
    try {
      await axiosInstance.post(
        `favorites/reciept/${reciept.id}/users/${user.data.id}/likes`
      );
      setIsLiked((prev) => !prev); // Обновляем состояние лайка
      countHandler(reciept.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (reciept.ingridients) {
      setIngidients(reciept.ingridients.split(","));
    }
  }, [reciept.ingridients]);

  const deliteRecieptHandle = async (id) => {
    try {
      await axiosInstance.delete(`/reciepts/${id}`);
      setReciepts((prevReciepts) => prevReciepts.filter((r) => r.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card style={{ width: "18rem", position: "relative" }}>
        <Card.Img variant="top" src={reciept.url} />
        <Card.Body>
          <Card.Title>{reciept.name} </Card.Title>
          <Button as={Link} to={`/${reciept.id}`} variant="outline-success">
            Подробнее
          </Button>
          {user && user.data && user.data.id === reciept.user_id && (
            <Button
              style={{ marginLeft: "40px" }}
              variant="outline-warning"
              onClick={() => deliteRecieptHandle(reciept.id)}
            >
              Удалить
            </Button>
          )}
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
            onClick={favouriteHandler}
            variant="outline-danger"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              border: "0",
              padding: "5px",
            }}
          >
            {isLiked ? <FcLike /> : <FcLikePlaceholder />}{" "}
          </Button>
        )}
      </Card>
    </>
  );
}
