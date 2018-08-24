import React from 'react';
import { connect } from 'react-redux';
import Item from './Item';
import { openPopup, closePopup, getGoods } from '../../store/actions';

class Goods extends React.Component {
  constructor(props) {
    super(props);

    this.watchItem = this.watchItem.bind(this);
  }

  componentDidMount() {
    this.props.getGoods();
  }

  watchItem(itemProps) {
    this.props.openPopup(Item, itemProps);
  }

  render() {
    const { openPopup, closePopup, goods } = this.props;

    if(!goods || goods.length === 0) return false;

    return (
      <div className="goods">
        <div className="goods__list">
          <div className="goods__item">
            {goods.map((item) => (
              <Item
                openPopup={openPopup}
                closePopup={closePopup}
                onWatchItem={this.watchItem}
                {...item}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  goods: state.goods.goods
});

export default connect(mapStateToProps, { openPopup, closePopup, getGoods })(Goods);
