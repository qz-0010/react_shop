import React from 'react';
import Nav from '../components/layout/Nav';
import Popup from '../components/Popup';

// const layout = (props) => {

//   return (
//     <div className="page">
//       <Nav />
//       {props.children}
//     </div>
//   )
// }

// export default layout;


export default class Layout extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="page">
        <Nav />
        {this.props.children}
        <Popup />
      </div>
    );
  }
}
