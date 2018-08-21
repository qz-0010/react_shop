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
      const cell = {
        valid: !props.required,
        required: props.required,
        type: props.type
      };

      switch(props.type){
        case 'file':
          cell.value = props.files;
          break;
        case 'checkbox':
          cell.checked = props.checked ? true : false;
          break;
        default:
          cell.value = props.value ? props.value : '';
      }
      newState.inputs[props.name] = cell;

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
      let cellsArr = [];
      
      inputsKeys.map((key) => {
        let cell = this.state.inputs[key];

        if(!cell.required || cell.type === 'file') return

        newState.inputs[key].valid = cell.type === 'checkbox' ? cell.checked : cell.value.trim().length > 0
        cellsArr.push(cell);
      });

      const notValidArr = cellsArr.filter(cell => !cell.valid);
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
