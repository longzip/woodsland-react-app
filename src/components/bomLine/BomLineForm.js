import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import FieldInput from "../common/FieldInput";
import FormSubmitButton from "../common/FormSubmitButton";
import SelectInput from "../common/SelectInput";

export const BomLineForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  heading,
  products,
  handleSave,
  handleCancel
}) => {
  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Thêm dòng định mức vật tư</h3>
      </div>
      <form role="form" onSubmit={handleSubmit(handleSave)}>
        <div className="card-body">
          <Field
            type="text"
            name="Product"
            label="Sản phẩm"
            options={products}
            component={SelectInput}
          />
          <Field
            type="number"
            name="productQty"
            label="Số lượng"
            placeholder="Nhập tên đơn vị tính"
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

BomLineForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default reduxForm({
  form: "BomLineForm",
  validate
})(BomLineForm);
