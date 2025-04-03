import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../../../shared/lib/axiosInstance';
import './OneRecieptCard.css';

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
    return <p className="loading">Загрузка рецепта...</p>;
  }

  return (
    <div className="recipe-card">
      {reciept.url && <img className="recipe-image" src={reciept.url} alt={reciept.name} />}
      
      <div className="recipe-content">
        <h2 className="recipe-title">{reciept.name}</h2>
        <p className="recipe-ingredients"><strong>Ингредиенты:</strong> {reciept.ingridients}</p>
        <p className="recipe-time"><strong>Время приготовления:</strong> {reciept.time}</p>
        <p className="recipe-instruction"><strong>Инструкция:</strong> {reciept.instruction}</p>

        <div className="recipe-footer">
          <Link to="/" className="back-button">Назад</Link>
          <button className="like-button">❤️</button>
        </div>
      </div>
    </div>
  );
}
