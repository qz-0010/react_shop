import React from 'react';
import { connect } from 'react-redux';
// import { openPopup, closePopup } from '../../store/actions';

// import withPopup from '../HOC/withPopup';

const Item = (props) => {

    const watchItem = () => {
        props.onWatchItem(props);
    }


  return (
    <div className="card">
        <img src={props.img} alt="" className="card__img"/>
        <p className="card__title">{props.title}</p>
        <p className="card__price">{props.price}₽</p>
        <button className="card__watch-btn" onClick={watchItem}>Посмотреть</button>
    </div>
  )
}

// const PopupItem = withPopup(Item);
// const mapStateToProps = (state) => {
//     console.log('mapStateToProps', state);

//     return {
//       text: state.hello.text,
//       contacts: state.contact.contacts
//     }
// }

export default Item;
// export default connect(null, null)(Item);
