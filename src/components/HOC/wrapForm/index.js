import React, { Fragment } from 'react';

function wrapForm(WrappedComponent) {
  return class extends React.Component {

    constructor(props) {
      super(props);

      this.onInputChange = this.onInputChange.bind(this);
    }

    state = {
      valid: false,
      inputs: {}
    };

    onInputInit(props) {
      const newState = {inputs: {}};

      newState.inputs[props.type] = [...this.state.inputs[props.type], {...props}]

      this.setState(newState);
    }

    onInputChange(e) {
      const { name, type, value, checked } = e.target;
      let val;
      const newState = {};

      if(type === 'checkbox' || type === 'radio'){
        val = checked;
      } else {
        val = value;
      }

      newState[name] = val;
      this.setState(newState);
      // console.log('wrapForm', this.state);
    }

    validate() {
      const { inputs } = this.state;
      const newState = {
        inputs: {

        }
      }

      if(inputs.radio) {
        let radioGroups = inputs.radio.reduce((_group, _input) => {
          if(!_group[_input.name]) _group[_input.name] = {valid: false, inputs: []};
          
          _group.inputs[_input.name].push(_input);
        }, {'name': {valid: false, inputs: []}});

        Object.keys(radioGroups).map((key, i) => {
          let _group = radioGroups[key];

          if(!_group.inputs[1].required) {
            return
          }

          let checked = _group.inputs.filter(_input => _input.checked)
          
          if(checked.length === 0) {
            _group.valid = false
          }
        });

        
      }


    }

    componentDidMount() {
      
    }

    render() {

      return (
        <Fragment>
          <WrappedComponent formState={this.state} onInputChange={this.onInputChange} {...this.props} />
        </Fragment>
      );
    }
  }
}

export default wrapForm;
