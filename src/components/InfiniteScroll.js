import React, { Fragment } from 'react';

export default class InfiniteScroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }

    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    debugger;
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  async onScroll() {
    if ( (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 200) && !this.state.isLoading ) {
      await this.setState({ isLoading: true });
      await this.props.cb();
      await this.setState({ isLoading: false });
    }
  }

  render() {
    const { Loader } = this.props;

    if(this.state.isLoading) {
      return Loader ? (<Fragment><Loader /></Fragment>) : false
    }

    return (
      <Fragment>
       {this.props.children}
      </Fragment>
    )
  }
}
