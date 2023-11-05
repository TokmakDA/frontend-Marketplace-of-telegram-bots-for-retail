import React from 'react';
import './Card.css';
import { Rating } from '../Rating/Rating';
import { CartButton, LikeButton } from '../buttons';
import PreviewImage from '../PreviewImage/PreviewImage';
import { convertToLocaleStringRub } from '../../utils/convertToLocaleStringRub';

const Card = ({ card }) => {
  return (
    <div className='cards__card card'>
      <div className='card__wrapper'>
        <LikeButton parentClass='card' card={card} />
        <PreviewImage card={card} parentClass='card' />
        <p className='card__title'>
          {card?.name || 'Название бота, которое может занимать 2 строки'}
        </p>
        <Rating ratingCard={card?.rating} />
      </div>
      <div className='card__wrapper'>
        <p className='card__price'>{convertToLocaleStringRub(card?.price)}</p>
        <CartButton parentClass='card' card={card} />
      </div>
    </div>
  );
};

export default Card;
