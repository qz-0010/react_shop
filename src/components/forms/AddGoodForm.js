import React from 'react';
import { connect } from 'react-redux';
import wrapForm from '../HOC/wrapForm';
import Input from '../Input';
import { adminAddGood } from '../../store/actions';

const AddGoodForm = (props) => {
  const _onSubmit = (e) => {
    e.preventDefault();
    props.validateForm();
    const image = props.formState.inputs['img'].value;
    
    if(!props.formState.valid || !image || !image[0]) return

    var data = new FormData();
    data.append('img', image[0]);
    props.adminAddGood(data, {
      onUploadProgress: (e) => {
        if (e.lengthComputable) {
          var percentage = (e.loaded / e.total) * 100;
          console.log(percentage + "%");
        }
      }
    })
  };

  return (
    <form action="/admin/good" method="POST" onSubmit={_onSubmit} encType="multipart/form-data" noValidate>
      <div>
        <Input
          onChange={props.onInputChange}
          onInit={props.onInputInit}
          type="text"
          name="title"
          placeholder="title"
          required={true}
        />
      </div>
      <div>
        <Input
          onChange={props.onInputChange}
          onInit={props.onInputInit}
          type="number"
          name="price"
          placeholder="price"
          required={true}
        />
      </div>
      <div>
        <Input onChange={props.onInputChange} onInit={props.onInputInit} type="file" name="img" required={true}/>
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  );
};

// const mapStateToProps = state => ({
//   goods: state.goods
// });

export default connect(null, { adminAddGood })(wrapForm(AddGoodForm));
