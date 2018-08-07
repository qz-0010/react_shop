import React from 'react';

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    active: this.props.active
  }

  componentDidMount() {
      this.setState({
        active: true
      });
  }

  close() {
    this.setState({
        active: !this.props.active
    })
  }

  render() {
    if(!this.state.active) return false

    return (
      <div className="popup">
          <div className="popup__close" onClick={this.close.bind(this)}>Закрыть</div>
          <div className="popup__body">
            {this.props.children}
          </div>
      </div>
    );
  }
}
