import React, { useEffect, useState } from 'react';
import FavoriteCard from '../widgets/FavoriteCard';
import axiosInstance from '../shared/lib/axiosInstance';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';

export default function FavoritesPage({ user, updateFavoritesCount }) {
  const [reciept, setReciept] = useState([]);
  const [show, setShow] = useState(false);

  const showHandler = () => {
    setShow(prev => !prev);
  };

  const getFavoriteCard = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/favorites/users/${user?.data?.id}/likes`
      );
      setReciept(data);
      updateFavoritesCount();
    } catch (error) {}
  };

  useEffect(() => {
    getFavoriteCard();
  }, []);

  const deleteAllFavorites = async () => {
    try {
      await axiosInstance.delete('/favorites/all');
      setReciept([]);
      updateFavoritesCount();
    } catch (error) {
      console.error('Failed to delete favorites:', error);
    }
  };

  return (
    <Row className='mt-3 mb-3'>
      {reciept.map(el => (
        <FavoriteCard
          updateFavoritesCount={updateFavoritesCount}
          key={el.id}
          user={user}
          reciept={el}
          setReciept={setReciept}
        />
      ))}
      <Button
        onClick={() => {
          deleteAllFavorites(), showHandler();
        }}
        variant='outline-success'>
        {show ? 'Нет рецептов' : 'Удалить все рецепты из избранного'}
      </Button>
    </Row>
  );
}
