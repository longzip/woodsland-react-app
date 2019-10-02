import React from "react";
import PropTypes from "prop-types";
export const FormSubmitButton = ({
  pristine,
  heading,
  submitting,
  reset,
  handleCancel
}) => {
  return (
    <div className="btn-group" role="group">
      <button type="submit" disabled={submitting} className="btn btn-primary">
        <i className="fa fa-paper-plane-o" aria-hidden="true" /> Lưu
      </button>

      {heading === "Add" && (
        <button
          type="button"
          disabled={pristine || submitting}
          onClick={reset}
          className="btn btn-default btn-space"
        >
          Làm lại
        </button>
      )}

      <button
        type="button"
        className="btn btn-default btn-space"
        onClick={handleCancel}
      >
        Hủy
      </button>
    </div>
  );
};
FormSubmitButton.propTypes = {
  heading: PropTypes.string.isRequired,
  submitting: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default FormSubmitButton;
