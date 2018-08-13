import React from 'react';
import { connect } from 'react-redux';
import Item from './Item';
import { openPopup, closePopup } from '../../store/actions';

class Goods extends React.Component {
  constructor(props) {
    super(props);

    this.watchItem = this.watchItem.bind(this);
  }

  watchItem(item) {
    this.props.openPopup(Item, item);
  }

  componentDidMount() {
    console.log('Goods', this.props);
  }

  render() {
    return (
      <div className="goods">
          <div className="goods__list">
              <div className="goods__item">
                {/*<Item openPopup={this.props.openPopup} onWatchItem={this.watchItem} title={'Lorem ipsum dolor.'} price={3438} img={'http://placekitten.com/150/200'} />*/}
                <Item openPopup={this.props.openPopup} closePopup={this.props.closePopup} onWatchItem={this.watchItem} title={'Lorem ipsum dolor.'} price={3438} img={'http://placekitten.com/150/200'} />
              </div>
          </div>
          {/*{this.renderPopup()}*/}
      </div>
    );
  }
}

export default connect(null, {openPopup, closePopup})(Goods);