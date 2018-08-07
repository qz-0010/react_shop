import React from 'react';
import Popup from '../Popup';
import Item from './Item';

export default class Goods extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    activePopup: false
  }

  watchItem(item) {
    this.setState({
        activePopup: !this.state.activePopup,
        activeItem: item
    });
  }

  renderPopup() {
    if(!this.state.activePopup) return false

    return (
        <Popup active={this.state.activePopup}>
            <p>hello popup</p>
        </Popup>
    )
  }

  render() {
    return (
      <div className="goods">
          <div className="goods__list">
              <div className="goods__item">
                <Item onWatchItem={this.watchItem.bind(this)} title={'Lorem ipsum dolor.'} price={3438} img={'http://placekitten.com/150/200'}/>
              </div>
          </div>
          {this.renderPopup()}
      </div>
    );
  }
}
