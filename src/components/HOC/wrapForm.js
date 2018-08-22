import React from 'react';

function wrapForm(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        valid: false,
        inputs: {}
      };
      
      this.setInputValues = this.setInputValues.bind(this);
      this.onInputInit = this.onInputInit.bind(this);
      this.onInputChange = this.onInputChange.bind(this);
      this.validate = this.validate.bind(this);
    }

    componentDidMount() {
      // this.validate();
    }

    setInputValues(props) {
      const newState = { ...this.state };
      const newStateInput = newState.inputs[props.name];
      const input = newStateInput ? newStateInput : {
        valid: !props.required,
        required: props.required,
        type: props.type
      };

      switch(props.type){
        case 'file':
          input.value = props.files;
          break;
        case 'checkbox':
          input.checked = props.checked;
          break;
        case 'radio':
          input.checked = props.checked;
          input.value = props.value;
          break;
        default:
          input.value = props.value ? props.value : '';
      }
      newState.inputs[props.name] = input;

      return this.setState(newState);
    }

    onInputInit(props) {
      this.setInputValues(props);
    }

    async onInputChange(e) {
      await this.setInputValues(e.target);
      this.validate();
      console.log(this.state);
    }

    validate() {
      const newState = { ...this.state };
      let inputsKeys = Object.keys(this.state.inputs);
      let inputsArr = [];
      
      inputsKeys.map((key) => {
        let input = this.state.inputs[key];

        if(!input.required || input.type === 'file') return

        newState.inputs[key].valid = input.type === 'checkbox' || input.type === 'radio' ? input.checked : input.value.trim().length > 0
        inputsArr.push(input);
      });

      const notValidArr = inputsArr.filter(input => !input.valid);
      newState.valid = notValidArr.length === 0;
      this.setState(newState);
    }

    render() {
      return (
        <WrappedComponent
          formState={this.state}
          onInputInit={this.onInputInit}
          onInputChange={this.onInputChange}
          validateForm={this.validate}
          {...this.props}
        />
      );
    }
  };
}

export default wrapForm;
