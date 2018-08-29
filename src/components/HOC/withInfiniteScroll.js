import React from 'react';

const withInfiniteScroll = (Component) => {
  return class WithInfiniteScroll extends React.Component {
    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
      if ( (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 200) ) {
        this.props.onPaginatedSearch();
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }
}
