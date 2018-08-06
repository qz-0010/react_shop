import React from 'react';
import { connect } from 'react-redux';
import { getContacts } from '../store/actions';

// const Hello = (props) => {
//   // props.dispatch({type: 'INIT', text: 'Hello from redux component'})

//   return (
//     <div>
//         <p>{props.text}</p>
//     </div>
//   )
// }

class Hello extends React.Component {

    componentDidMount() {
        debugger;
        this.props.getContacts();
        console.log('getContacts', this.props.contacts)
        // this.props.dispatch({type: 'INIT', text: 'Hello from redux component'})
    }

    render() {
        return (
            <div>
                <p>{this.props.text}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps', state);
    
    return {
      text: state.hello.text,
      contacts: state.contact.contacts
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         dispatch,
//         getContacts: getContacts(dispatch)
//     };
// };

export default connect(mapStateToProps, {getContacts})(Hello);
