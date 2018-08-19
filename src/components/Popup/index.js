import React from 'react';
import { connect } from 'react-redux';
import { openPopup, closePopup } from '../../store/actions';

const Popup = (props) => {
  const { Component, active, componentProps } = props;

  if (!active) return false;

  return (
    <div className="popup">
      <button type="button" className="popup__close" onClick={this.props.closePopup}>Закрыть</button>
      <div className="popup__body">
        <Component {...componentProps} />
      </div>
    </div>
  );
};

const mapStateToProps = state => state.popup;

export default connect(mapStateToProps, { openPopup, closePopup })(Popup);
