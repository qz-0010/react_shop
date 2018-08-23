import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import wrapForm from '../HOC/wrapForm';
import Input from '../Input';
import { adminAddGood } from '../../store/actions';

const AddGoodForm = (props) => {
  const imgInput = props.formState.inputs['img']
  const image = imgInput ? imgInput.value : false;
  var fileActiveClass = !image || !image[0] ? '' : ' active';
  var fileLabelClass = 'form__label form__label_file' + fileActiveClass;

  const _onSubmit = (e) => {
    e.preventDefault();
    props.validateForm();

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
    });
  };

  return (
    <Fragment>
      <form className="form" action="/admin/good" method="POST" onSubmit={_onSubmit} encType="multipart/form-data" noValidate>
        <h4 className="form__title">Добавление товара:</h4>
        <div className="form__row">
          <Input
            className="form__input form__input_full-width form__input_txt"
            onChange={props.onInputChange}
            onInit={props.onInputInit}
            type="text"
            name="title"
            placeholder="title"
            required
            autoFocus
          />
        </div>
        <div className="form__row">
          <Input
            className="form__input form__input_full-width form__input_txt"
            onChange={props.onInputChange}
            onInit={props.onInputInit}
            type="number"
            name="price"
            placeholder="price"
            required
          />
        </div>
        <div className="form__row">
          <label className={fileLabelClass}>
            <i className="icon">add_a_photo</i>
            <Input className="hidden" onChange={props.onInputChange} onInit={props.onInputInit} type="file" name="img" required />
          </label>
        </div>
        <div className="form__row">
          <input className="btn btn_action" value="Добавить" type="submit" />
        </div>
      </form>
    </Fragment>
  );
};

// const mapStateToProps = state => ({
//   goods: state.goods
// });

export default connect(null, { adminAddGood })(wrapForm(AddGoodForm));
