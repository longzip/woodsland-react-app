import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import FieldInput from "../common/FieldInput";
import SelectInput from "../common/SelectInput";
import TextareaInput from "../common/TextareaInput";
import FormSubmitButton from "../common/FormSubmitButton";

const RoutingWorkcenterForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  heading,
  workcenters,
  handleSave,
  handleCancel
}) => {
  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">
          {heading === "Add"
            ? "Tạo quy trình sản xuất"
            : "Sửa quy trình sản xuất"}
        </h3>
      </div>
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="card-body">
          <Field
            type="number"
            name="sequence"
            label="Thứ tự"
            component={FieldInput}
          />

          <Field
            type="text"
            name="name"
            label="Tên quy trình"
            placeholder="Name of the course"
            component={FieldInput}
          />

          <Field
            type="text"
            options={workcenters}
            name="Workcenter"
            label="Công đoạn sản xuất"
            component={SelectInput}
          />

          <Field
            type="text"
            name="note"
            label="Ghi chú"
            placeholder="Ghi chú"
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

RoutingWorkcenterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default reduxForm({
  form: "RoutingWorkcenterForm",
  validate
})(RoutingWorkcenterForm);
