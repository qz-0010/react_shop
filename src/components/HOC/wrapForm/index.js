import React from 'react';

function wrapForm(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
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

      this.onInputInit = this.onInputInit.bind(this);
      this.onInputChange = this.onInputChange.bind(this);
      this.validate = this.validate.bind(this);
    }

    componentDidMount() {
      this.validate();
    }

    onInputInit(props) {
      const newState = { ...this.state };
      let typeCell = newState.inputs[props.type];

      if (!typeCell) {
        newState.inputs[props.type] = {};
        typeCell = newState.inputs[props.type];
      }
      if (!typeCell[props.name]) {
        typeCell[props.name] = { valid: false, inputs: [] };
      }
      typeCell[props.name].inputs.push({ ...props });

      newState.inputs = { ...this.state.inputs, ...newState.inputs };

      this.setState(newState);
    }

    async onInputChange(e) {
      const {
        name, type, value, checked
      } = e.target;
      const newState = { ...this.state };
      newState.values[name] = type === 'checkbox' ? checked : value;

      const currentCell = newState.inputs[type][name];

      currentCell.inputs.map((inputProp) => {
        if (type === 'radio' && inputProp.value === value) {
          inputProp.checked = checked;
          return;
        }
        if (inputProp.name === name) {
          if (type === 'checkbox') {
            inputProp.checked = checked;
            return;
          }
          inputProp.value = value;
        }
      });
      await this.setState(newState);
      this.validate();
    }

    validate() {
      const newState = { ...this.state };
      let inputTypes = Object.keys(this.state.inputs);
      const allCellsArr = [];

      if (inputTypes.length === 0) return;

      if (this.state.inputs.radio) {
        inputTypes = inputTypes.filter(type => type !== 'radio');

        const radioNames = Object.keys(this.state.inputs.radio);
        radioNames.map((name) => {
          const radioGroup = this.state.inputs.radio[name];

          // if radio group not required
          if (!radioGroup.inputs[0].required) return;

          const checkedRadio = radioGroup.inputs.filter(prop => prop.checked);

          newState.inputs.radio[name].valid = checkedRadio.length > 0;

          allCellsArr.push(radioGroup);
        });
      }

      inputTypes.map((type) => {
        if (type === 'file') return;

        const typeNames = Object.keys(this.state.inputs[type]);

        typeNames.map((name) => {
          const inputGroup = this.state.inputs[type][name];

          inputGroup.inputs.map((prop) => {
            let {
              name, required, checked, value
            } = prop;
            const currentCell = newState.inputs[type][name];
            value = value ? value.trim() : '';
            const val = type === 'checkbox' ? checked : value.length !== 0;

            if (required) {
              currentCell.valid = val;
            } else {
              currentCell.valid = true;
            }
          });
          allCellsArr.push(inputGroup);
        });
      });

      newState.valid = allCellsArr.filter(cell => !cell.valid).length === 0;

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
