import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import FieldInput from "../common/FieldInput";

export const LoginForm = ({
  handleSubmit,
  submitting,
  handleLogin,
}) => {
  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Field
        type="text"
        name="username"
        label="Tên đăng nhập"
        placeholder="Tên đăng nhập"
        component={FieldInput}
      />

      <Field
        type="password"
        name="password"
        label="Mật khẩu"
        placeholder=""
        component={FieldInput}
      />

      <div>
        <button type="submit" disabled={submitting} className="btn btn-primary">
          <i className="fa fa-paper-plane-o" aria-hidden="true" /> Sign In
        </button>
      </div>
    </form>
  );
};

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  return errors;
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default reduxForm({
  form: "LoginForm",
  validate
})(LoginForm);
