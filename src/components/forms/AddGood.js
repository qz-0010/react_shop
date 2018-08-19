import React from 'react';
import wrapForm from '../HOC/wrapForm';
import Input from '../Input';

const AddGood = (props) => {
  const _onSubmit = (e) => {
    e.preventDefault();
    props.validateForm();
    props.onSubmit(props.formState);
  };

  return (
    <form action="/admin/good" method="POST" onSubmit={_onSubmit} noValidate>
      <div>
        <Input onChange={props.onInputChange} onInit={props.onInputInit} type="text" name="title" placeholder="title" required />
      </div>
      <div>
        <Input onChange={props.onInputChange} onInit={props.onInputInit} type="number" name="price" placeholder="price" required />
      </div>
      <div>
        <Input onChange={props.onInputChange} onInit={props.onInputInit} type="file" name="img" />
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  );
};

export default wrapForm(AddGood);
