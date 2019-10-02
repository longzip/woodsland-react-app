import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as workorderAction from "../../action/WorkorderAction";
import WorkorderForm from "./WorkorderForm";

export class AddOrEditWorkorderContainer extends React.Component {
  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id)
      this.props.action
        .getWorkorderAction(this.props.match.params.id)
        .catch(error => {
          toastr.error(error);
        });
  }

  handleSave(values) {
    const workorder = {
      id: values.id,
      code: values.code,
      name: values.name
    };

    this.props.action
      .saveWorkorderAction(workorder)
      .then(() => {
        toastr.success("Đã lưu");
        this.props.history.push("/mrp/workorders");
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.replace("/mrp/workorders");
  }

  render() {
    const { initialValues } = this.props;
    const heading = initialValues && initialValues.id ? "Edit" : "Add";
    return (
      <div className="content-wrapper">
        <div className="container">
          <WorkorderForm
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
    state.selectedWorkorderReducer.workorder &&
    id === state.selectedWorkorderReducer.workorder.id
  ) {
    return {
      initialValues: state.selectedWorkorderReducer.workorder
    };
  } else {
    return {};
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(workorderAction, dispatch)
});

AddOrEditWorkorderContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  initialValues: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrEditWorkorderContainer);
