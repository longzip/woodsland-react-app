import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import FieldInput from "../common/FieldInput";
import SelectInput from "../common/SelectInput";
import TextareaInput from "../common/TextareaInput";
import FormSubmitButton from "../common/FormSubmitButton";

export const OrderLineForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  heading,
  products,
  uoms,
  handleSave,
  handleCancel
}) => {
  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Thêm sản phẩm</h3>
      </div>
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="card-body">
          <Field
            name="product"
            label="Chọn sản phẩm"
            options={products}
            component={SelectInput}
          />

          <Field
            type="text"
            name="productDimension"
            label="Kích thước"
            placeholder="DxRxC"
            component={FieldInput}
          />

          <Field
            type="text"
            name="productSpec"
            label="Spec"
            placeholder="Product Spec"
            component={FieldInput}
          />

          <Field
            type="number"
            name="productUomQty"
            label="Số lượng"
            placeholder="Name of the course"
            component={FieldInput}
          />

          <Field
            type="text"
            name="productUom"
            options={uoms}
            label="Đơn vị tính"
            component={SelectInput}
          />

          <Field
            type="number"
            name="productPrice"
            label="Giá"
            placeholder=""
            component={FieldInput}
          />

          <Field
            type="text"
            name="note"
            label="Ghi chú"
            placeholder=""
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

OrderLineForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default reduxForm({
  form: "OrderLineForm",
  validate
})(OrderLineForm);
