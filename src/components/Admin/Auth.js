import React from 'react';
import wrapForm from '../HOC/wrapForm';

const Auth = (props) => {
  return (
    <div>
      <form action="/admin/auth" method="POST">
        <div><input type="text" name="email" placeholder="email"/></div>
        <div><input type="password" name="password" placeholder="password"/></div>
        <div><input type="submit" onSubmit={props.onSubmit}/></div>
      </form>
    </div>
  );
};

export default wrapForm(Auth);
