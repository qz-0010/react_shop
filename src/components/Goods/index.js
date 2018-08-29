import React from 'react';
import { connect } from 'react-redux';
import Item from './Item';
import InfiniteScroll from '../InfiniteScroll';
import { openPopup, closePopup, getGoods } from '../../store/actions';

class Goods extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1
    }

    this.onScrollDone = this.onScrollDone.bind(this);
    this.watchItem = this.watchItem.bind(this);
  }

  componentDidMount() {
    this.props.getGoods(this.state.page);
  }

  watchItem(itemProps) {
    this.props.openPopup(Item, itemProps);
  }

  async onScrollDone() {
    let { page } = this.state;

    this.props.getGoods(page+1);
    
    await this.setState({
      page: ++page 
    });
  }

  render() {
    const { openPopup, closePopup, goods } = this.props;

    if(!goods || goods.length === 0) return false;

    return (
      <div className="goods">
        <InfiniteScroll
          cb={this.onScrollDone}
        >
          <div className="goods__list">
            {goods.map((item) => (
              <div className="goods__item">
                <Item
                  openPopup={openPopup}
                  closePopup={closePopup}
                  onWatchItem={this.watchItem}
                  {...item}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  goods: state.goods.goods
});

export default connect(mapStateToProps, { openPopup, closePopup, getGoods })(Goods);
