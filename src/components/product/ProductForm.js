import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import FieldInput from "../common/FieldInput";
import FormSubmitButton from "../common/FormSubmitButton";
import CityInput from "../common/CityInput";
import TextareaInput from "../common/TextareaInput";

export const ProductForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  heading,
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
            type="text"
            name="code"
            label="Mã sản phẩm"
            placeholder="Nhập mã sản phẩm"
            component={FieldInput}
          />

          <Field
            type="text"
            name="name"
            label="Tên"
            placeholder="Tên sản phẩm"
            component={FieldInput}
          />
          <Field
            type="number"
            name="listPrice"
            label="Giá"
            placeholder="0"
            component={FieldInput}
          />
          <Field
            type="text"
            name="uom"
            options={uoms}
            label="Đơn vị"
            component={CityInput}
          />
          <Field
            type="text"
            name="description"
            label="Mô tả"
            placeholder="Mô tả sản phẩm"
            component={TextareaInput}
          />
          <Field
            type="text"
            name="imageUrl"
            label="Đường dẫn ảnh (lấy từ website)"
            placeholder="https://"
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

  return errors;
};

ProductForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default reduxForm({
  form: "ProductForm",
  validate
})(ProductForm);
