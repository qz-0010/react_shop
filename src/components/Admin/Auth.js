import React from 'react';
import wrapForm from '../HOC/wrapForm';
import Input from '../Input';

const Auth = (props) => {
  const _onSubmit = (e) => {
    e.preventDefault();
    props.validateForm();
    props.onSubmit(props.formState);
  };

  return (
    <div>
      <form action="/login" method="POST" onSubmit={_onSubmit} noValidate>
        <div>
          <Input onChange={props.onInputChange} onInit={props.onInputInit} type="text" name="email" placeholder="email" required={true}/>
        </div>
        <div>
          <Input onChange={props.onInputChange} onInit={props.onInputInit} type="password" name="password" placeholder="password" required={true}/>
        </div>
        <div><input type="submit"/></div>
      </form>
    </div>
  );
};

export default wrapForm(Auth);
