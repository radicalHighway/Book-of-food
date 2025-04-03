import React, { useEffect, useState } from "react";
import FavoriteCard from "../widgets/FavoriteCard";
import axiosInstance from "../shared/lib/axiosInstance";
import Row from "react-bootstrap/Row";

export default function FavoritesPage({ user }) {
  const [reciept, setReciept] = useState([]);
  

  const getFavoriteCard = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/favorites/users/${user?.data?.id}/likes`
      );
      console.log(data);
      setReciept(data);
    } catch (error) {}
  };

  useEffect(() => {
    getFavoriteCard();
  }, []);

  return (
    <Row className="mt-3 mb-3">
      {reciept.map((el) => (
        <FavoriteCard key={el.id} reciept={el} />
      ))}
    </Row>
  );
}
