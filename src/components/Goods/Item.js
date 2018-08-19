import React from 'react';

const Item = (props) => {
  const watchItem = () => {
    props.onWatchItem(props);
  };

  return (
    <div className="card">
      <img src={props.img} alt="" className="card__img" />
      <p className="card__title">{props.title}</p>
      <p className="card__price">
        {props.price}
        {' ₽'}
      </p>
      <button type="button" className="card__watch-btn" onClick={watchItem}>Посмотреть</button>
    </div>
  );
};

export default Item;
