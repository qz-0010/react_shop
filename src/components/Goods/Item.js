import React from 'react';

const Item = (props) => {

    const watchItem = () => {
        props.onWatchItem(props);
    }

  return (
    <div className="card">
        <img src={props.img} alt="" className="card__img"/>
        <p className="card__title">{props.title}</p>
        <p className="card__price">{props.price}₽</p>
        <div className="card__watch-btn" onClick={watchItem}>Посмотреть</div>
    </div>
  )
}

export default Item;