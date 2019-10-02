import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as uomAction from "../../action/UomAction";
import UomForm from "./UomForm";

export class AddOrEditUomContainer extends React.Component {
  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    if(this.props.match.params.id)
    this.props.action.getUomAction(this.props.match.params.id).catch(error => {
      toastr.error(error);
    });
  }

  handleSave(values) {
    const uom = {
      id: values.id,
      code: values.code,
      name: values.name
    };

    this.props.action
      .saveUomAction(uom)
      .then(() => {
        toastr.success("Uom saved");
        this.props.history.push("/settings/uoms");
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.replace("/settings/uoms");
  }

  render() {
    const { initialValues } = this.props;
    const heading = initialValues && initialValues.id ? "Edit" : "Add";
    console.log(this.props.initialValues);
    return (
      <div className="content-wrapper">
        <div className="container">
          <UomForm
            heading={heading}
            handleSave={this.handleSave}
            handleCancel={this.handleCancel}
            initialValues={this.props.initialValues}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = parseInt(ownProps.match.params.id);
  if (
    id &&
    state.selectedUomReducer.uom &&
    id === state.selectedUomReducer.uom.id
  ) {
    return {
      initialValues: state.selectedUomReducer.uom
    };
  } else {
    return {};
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(uomAction, dispatch)
});

AddOrEditUomContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  initialValues: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrEditUomContainer);
