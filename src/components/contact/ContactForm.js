import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import FieldInput from "../common/FieldInput";
import TextareaInput from "../common/TextareaInput";
import CityInput from "../common/CityInput";
import FormSubmitButton from "../common/FormSubmitButton";
import cities from "../../api/City";

export const ContactForm = ({
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
        <h3 className="card-title">Thêm khách hàng</h3>
      </div>
      <form role="form" onSubmit={handleSubmit(handleSave)}>
        <div className="card-body">
          <Field
            type="text"
            name="name"
            label="Mã dự án"
            placeholder="DA.."
            component={FieldInput}
          />
          <Field
            type="text"
            name="description"
            label="Tên chủ đầu tư"
            placeholder="Nhập tên chủ đầu tư"
            component={FieldInput}
          />
          <Field
            type="text"
            name="addressLine"
            label="Địa chỉ"
            placeholder="Nhập địa chỉ dự án"
            component={FieldInput}
          />
          <Field
            type="text"
            options={cities}
            name="city"
            label="Tỉnh thành"
            placeholder="Chọn tỉnh thành phố"
            component={CityInput}
          />
          <Field
            type="number"
            name="phone"
            label="Phone"
            placeholder="Nhập số điện thoại"
            component={FieldInput}
          />
          <Field
            type="text"
            name="email"
            label="Email"
            placeholder="Nhập email"
            component={FieldInput}
          />
          <Field
            type="textarea"
            rows="5"
            name="note"
            label="Ghi chú"
            placeholder="Ghi chú dự án"
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

  if (!values.description) {
    errors.description = "Required";
  }

  if (!values.addressLine) {
    errors.addressLine = "Required";
  }

  if (!values.phone) {
    errors.phone = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  }

  if (!values.city) {
    errors.city = "Required";
  }

  return errors;
};

ContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default reduxForm({
  form: "ContactForm",
  validate
})(ContactForm);
