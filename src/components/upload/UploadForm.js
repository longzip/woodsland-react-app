import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import FieldInput from "../common/FieldInput";
import FileInput from "../common/FileInput";
import FormSubmitButton from "../common/FormSubmitButton";
export const FileUpload = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  heading,
  handleSave,
  handleCancel
}) => {
  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Thêm tài liệu</h3>
      </div>
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="card-body">
          <Field
            type="text"
            name="name"
            label="Tên tài liệu"
            placeholder="Nhập tên tài liệu"
            component={FieldInput}
          />
          <Field
            type="file"
            name="uploadFile"
            label="Chọn file"
            placeholder="Nhập tên đơn vị tính"
            component={FileInput}
          />
        </div>
        <div className="card-footer">
          <FormSubmitButton
            pristine={pristine}
            heading={heading}
            submitting={submitting}
            reset={reset}
            handleCancel={handleCancel}
          />
        </div>
      </form>
    </div>
  );
};
const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.uploadFile) {
    errors.uploadFile = "Required";
  }

  return errors;
};

FileUpload.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default reduxForm({
  form: "FileUpload",
  validate
})(FileUpload);
