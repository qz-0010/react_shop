import React from 'react';
import { connect } from 'react-redux';
import Item from './Item';
import { openPopup, closePopup } from '../../store/actions';

class Goods extends React.Component {
  constructor(props) {
    super(props);

    this.watchItem = this.watchItem.bind(this);
  }

  componentDidMount() {
  }

  watchItem(itemProps) {
    this.props.openPopup(Item, itemProps);
  }

  render() {
    const { openPopup, closePopup } = this.props;

    return (
      <div className="goods">
        <div className="goods__list">
          <div className="goods__item">
            <Item openPopup={openPopup} closePopup={closePopup} onWatchItem={this.watchItem} title="Lorem ipsum dolor." price={3438} img="http://placekitten.com/150/200" />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { openPopup, closePopup })(Goods);
