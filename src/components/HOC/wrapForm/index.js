import React, { Fragment } from 'react';

function wrapForm(WrappedComponent) {
  return class extends React.Component {

    constructor(props) {
      super(props);
      this.onInputInit = this.onInputInit.bind(this);
      this.onInputChange = this.onInputChange.bind(this);
      this.validate = this.validate.bind(this);
    }

    state = {
      valid: false,
      values: {},
      inputs: {
        // radio: {
        //   name: {
        //     valid: false
        //   }
        // }
        // text: {
        //   name: {
        //     valid: false
        //   }
        // }
      }
    };

    onInputInit(props) {
      const newState = {...this.state};
      var typeCell = newState.inputs[props.type];

      if(!typeCell) {
        typeCell = newState.inputs[props.type] = {
        }
      }
      if(!typeCell[props.name]) {
        typeCell[props.name] = {valid: false, inputs: []}
      }
      typeCell[props.name].inputs.push({...props});

      newState.inputs = { ...this.state.inputs, ...newState.inputs };

      this.setState(newState);
    }

    async onInputChange(e) {
      const { name, type, value, checked } = e.target;
      const newState = {...this.state};
      newState.values[name] = type === 'checkbox' ? checked : value;

      let currentCell = newState.inputs[type][name];

      currentCell.inputs.map((inputProp) => {
        if(type === 'radio' && inputProp.value === value) {
          inputProp.checked = checked;
          return;
        }
        if(inputProp.name === name) {
          if(type === 'checkbox') {
            inputProp.checked = checked;
            return;
          }
          inputProp.value = value;
        }        
      });
      await this.setState(newState);
      this.validate();
      console.log('wrapForm', this.state);
    }

    validate() {
      const newState = {...this.state};
      var inputTypes = Object.keys(this.state.inputs);
      var allCellsArr = [];

      if(inputTypes.length === 0) return;

      if(this.state.inputs.radio) {
        inputTypes = inputTypes.filter( type => type !== 'radio' );

        let radioNames = Object.keys(this.state.inputs.radio);
        radioNames.map((name) => {
          let radioGroup = this.state.inputs.radio[name];
          
          // if radio group not required
          if(!radioGroup.inputs[0].required) return

          let checkedRadio = radioGroup.inputs.filter( prop => prop.checked );

          if(checkedRadio.length > 0) {
            newState.inputs.radio[name].valid = true;
          } else {
            newState.inputs.radio[name].valid = false;
          }
          allCellsArr.push(radioGroup);
        })
      }

      inputTypes.map((type) => {
        if(type === 'file') return;

        let typeNames =  Object.keys(this.state.inputs[type]);
        
        typeNames.map((name) => {
          let inputGroup = this.state.inputs[type][name];

          inputGroup.inputs.map((prop, i) => {
            let { name, required, checked, value } = prop;
            let currentCell = newState.inputs[type][name];
            value = value ? value.trim() : "";
            let val = type === 'checkbox' ? checked : value.length !== 0;

            if(required) {
              currentCell.valid = val;
            } else {
              currentCell.valid = true;
            }
          });
          allCellsArr.push(inputGroup);
        });
      });

      newState.valid = allCellsArr.filter( cell => !cell.valid ).length === 0

      this.setState(newState);
    }

    componentDidMount() {
      this.validate();
    }

    render() {

      return (
        <Fragment>
          <WrappedComponent formState={this.state} onInputInit={this.onInputInit} onInputChange={this.onInputChange} validateForm={this.validate} {...this.props} />
        </Fragment>
      );
    }
  }
}

export default wrapForm;
