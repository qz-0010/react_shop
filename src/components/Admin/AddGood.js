import React from 'react';
import wrapForm from '../HOC/wrapForm';

const AddGood = (props) => {
  const _onSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(props.formState);
  };

  return (
    <div>
      <form action="/admin/good" method="POST" onSubmit={_onSubmit}>
        <div><input onChange={props.onInputChange} type="text" name="title" placeholder="title"/></div>
        <div><input onChange={props.onInputChange} type="number" name="price" placeholder="price"/></div>
        <div><input onChange={props.onInputChange} type="file" multiple name="img"/></div>
        <div><input type="submit" /></div>
      </form>
    </div>
  );
};

export default wrapForm(AddGood);
