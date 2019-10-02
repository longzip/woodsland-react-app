import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import FieldInput from "../common/FieldInput";
import FormSubmitButton from "../common/FormSubmitButton";
import TextareaInput from "../common/TextareaInput";

export const RoutingForm = ({
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
        <h3 className="card-title">Thêm quy trình sản xuất</h3>
      </div>
      <form role="form" onSubmit={handleSubmit(handleSave)}>
        <div className="card-body">
          <Field
            type="text"
            name="code"
            label="Mã"
            placeholder="Đặt mã cho quy trình"
            component={FieldInput}
          />
          <Field
            type="text"
            name="name"
            label="Name"
            placeholder="Tên quy trình"
            component={FieldInput}
          />

          <Field
            type="text"
            name="note"
            label="Mô tả"
            placeholder="Mô tả quy trình"
            component={TextareaInput}
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

RoutingForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default reduxForm({
  form: "RoutingForm",
  validate
})(RoutingForm);
