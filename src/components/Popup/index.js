import React from 'react';
import { connect } from 'react-redux';
import { openPopup, closePopup } from '../../store/actions';

class Popup extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('popup', this.props);
  }

  componentDidUpdate() {
    console.log('popup', this.props.props.img);
  }

  render() {
    const { Component, active, props } = this.props;
    if(!active) return false

    return (
        <div className="popup">
            <button className="popup__close" onClick={this.props.closePopup}>Закрыть</button>
            <div className="popup__body">
                <Component {...props}/>
                popup!
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
