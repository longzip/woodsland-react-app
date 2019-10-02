import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import FieldInput from "../common/FieldInput";
import FormSubmitButton from "../common/FormSubmitButton";

export const UserForm = ({
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
        <h3 className="card-title">Thêm tài khoản người dùng</h3>
      </div>
      <form role="form" onSubmit={handleSubmit(handleSave)}>
        <div className="card-body">
          <Field
            type="text"
            name="name"
            label="Họ và tên"
            placeholder="Họ và tên"
            component={FieldInput}
          />

          <Field
            type="text"
            name="username"
            label="Tên đăng nhập"
            placeholder="Tên đăng nhập"
            component={FieldInput}
          />

          <Field
            type="text"
            name="email"
            label="Email"
            placeholder="Email"
            component={FieldInput}
          />

          <Field
            type="password"
            name="newpassword"
            label="Mật khẩu"
            placeholder=""
            component={FieldInput}
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

  return errors;
};

UserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default reduxForm({
  form: "UserForm",
  validate
})(UserForm);
