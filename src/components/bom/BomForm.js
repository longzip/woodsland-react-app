import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import FieldInput from "../common/FieldInput";
import FormSubmitButton from "../common/FormSubmitButton";
import SelectInput from "../common/SelectInput";
import CityInput from "../common/CityInput";

export const BomForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  heading,
  products,
  routings,
  handleSave,
  handleCancel
}) => {
  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Thêm định mức nguyên vật liệu</h3>
      </div>
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="card-body">
          {heading === "Add" && (
            <Field
              type="text"
              name="Product"
              label="Sản phẩm"
              options={products}
              component={SelectInput}
            />
          )}
          {heading === "Edit" && (
            <Field
              type="text"
              name="ProductId"
              label="Sản phẩm"
              options={products}
              component={CityInput}
            />
          )}
          <Field
            type="text"
            name="name"
            label="Biến thể sản phẩm"
            placeholder="Nhập tên biến thể sản phẩm"
            component={FieldInput}
          />
          <Field
            type="number"
            name="productQty"
            label="Số lượng"
            component={FieldInput}
          />
          <Field
            type="text"
            name="RoutingId"
            label="Quy trình sản xuất"
            options={routings}
            component={CityInput}
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

BomForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default reduxForm({
  form: "BomForm",
  validate
})(BomForm);
