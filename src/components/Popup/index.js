import React from 'react';
import { connect } from 'react-redux';
import { openPopup, closePopup } from '../../store/actions';

class Popup extends React.Component {

  render() {
    const { Component, active, props } = this.props;
    if(!active) return false

    return (
        <div className="popup">
            <button className="popup__close" onClick={this.props.closePopup}>Закрыть</button>
            <div className="popup__body">
                <Component {...props}/>
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
    console.log('mapStateToPropsPopup', state);
    // const { state.popup }
    return state.popup
}

export default connect(mapStateToProps, {openPopup, closePopup})(Popup);
