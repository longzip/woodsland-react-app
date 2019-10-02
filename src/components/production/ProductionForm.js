import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import FieldInput from "../common/FieldInput";
import SelectInput from "../common/SelectInput";
import CityInput from "../common/CityInput";
import FormSubmitButton from "../common/FormSubmitButton";
import DatePicker, { formatDates, normalizeDates } from "../common/Datepicker";

const ProductionForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  heading,
  products,
  uoms,
  contacts,
  routings,
  handleSave,
  handleCancel
}) => {
  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Thêm</h3>
      </div>
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="card-body">
          <Field
            type="text"
            name="name"
            label="Số"
            placeholder="Lệnh sản xuất số"
            component={FieldInput}
          />
          <Field
            name="Contact"
            label="Dự án"
            options={contacts}
            component={SelectInput}
          />
          <Field
            name="Product"
            label="Sản phẩm"
            options={products}
            component={SelectInput}
          />
          <Field
            name="Routing"
            label="Quy trình sản xuất"
            options={routings}
            component={SelectInput}
          />
          <Field
            type="number"
            name="productQty"
            label="Số lượng cần Sản xuất"
            placeholder="0"
            component={FieldInput}
          />

          <Field
            options={uoms}
            name="productUom"
            label="Đơn vị tính"
            placeholder="0"
            component={CityInput}
          />

          <Field
            type="number"
            name="factor"
            label="Hệ số"
            placeholder="0"
            component={FieldInput}
          />

          <Field
            name={"datePlannedFinished"}
            component={DatePicker}
            parse={normalizeDates}
            format={formatDates}
            label="Hạn chót để sản xuất"
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

ProductionForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default reduxForm({
  form: "ProductionForm",
  validate
})(ProductionForm);
