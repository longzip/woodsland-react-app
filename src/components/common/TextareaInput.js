import React from "react";
import PropTypes from "prop-types";

const TextareaInput = ({
  input,
  type,
  rows,
  name,
  label,
  placeholder,
  meta: { touched, error, warning }
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      <div className="field">
        <textarea
          {...input}
          type= {type}
          rows={rows}
          name={name}
          className="form-control"
          placeholder={placeholder}
        />

        {touched &&
          ((error && <p className="text-danger">{error}</p>) ||
            (warning && <p className="text-danger">{warning}</p>))}
      </div>
    </div>
  );
};

TextareaInput.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  meta: PropTypes.object.isRequired
};

export default TextareaInput;
