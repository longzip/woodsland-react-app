import React, { PureComponent } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";
import "moment/locale/vi";
import moment from "moment";
import { Field } from "redux-form";

class DatePicker extends PureComponent {
  constructor(props) {
    super(props);
    // moment.locale("vi");
  }

  state = {
    focused: false
  };

  onFocusChange = value => {
    this.setState({ focused: !this.state.focused });
    const { input } = this.props;
    input.onFocus(value);
  };

  render() {
    const {
      input,
      meta: { touched, error, warning },
      placeholder,
      disabled,
      name,
      label
    } = this.props;
    const { focused } = this.state;
    const invalid = error !== undefined && error !== null;

    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <div className="field">
          <SingleDatePicker
            showClearDate={true}
            showDefaultInputIcon={true}
            displayFormat="YYYY-MM-DD"
            numberOfMonths={1}
            disabled={disabled}
            placeholder={placeholder}
            date={input.value}
            onDateChange={input.onChange}
            focused={focused}
            onFocusChange={this.onFocusChange}
            id={input.name}
          />
          {touched &&
            ((error && <p className="text-danger">{error}</p>) ||
              (warning && <p className="text-danger">{warning}</p>))}
        </div>
      </div>
    );
  }
}

export const formatDates = value => (value ? moment(value) : null);

export const normalizeDates = value =>
  value ? value.format("YYYY-MM-DD") : null;

export const FieldDatePicker = props => {
  return (
    <Field
      normalize={normalizeDates}
      format={formatDates}
      name={props.name}
      component={DatePicker}
      props={props}
    />
  );
};

export default DatePicker;
