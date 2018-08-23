import React from 'react';
import { connect } from 'react-redux';
import { openPopup, closePopup } from '../../store/actions';

const Popup = (props) => {
  const { Component, active } = props;
  const componentProps = props.componentProps || {};

  if (!active) return false;

  return (
    <div className="popup">
      <div className="popup__bg" onClick={props.closePopup}></div>
      <div className="popup__inner">
        <span className="popup__close" onClick={props.closePopup}><i className="icon">close</i></span>
        <div className="popup__body">
          <Component {...componentProps} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => state.popup;

export default connect(mapStateToProps, { openPopup, closePopup })(Popup);
