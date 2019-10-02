import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as routingAction from "../../action/RoutingAction";
import RoutingForm from "./RoutingForm";

export class AddOrEditRoutingContainer extends React.Component {
  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id)
      this.props.action
        .getRoutingAction(this.props.match.params.id)
        .catch(error => {
          toastr.error(error);
        });
  }

  handleSave(values) {
    const routing = {
      id: values.id,
      code: values.code,
      name: values.name,
      note: values.note
    };

    this.props.action
      .saveRoutingAction(routing)
      .then(() => {
        toastr.success("Đã lưu thành công");
        this.props.history.push("/datas/routings");
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.replace("/datas/routings");
  }

  render() {
    const { initialValues } = this.props;
    const heading = initialValues && initialValues.id ? "Edit" : "Add";
    console.log(this.props.initialValues);
    return (
      <div className="content-wrapper">
        <div className="container">
          <RoutingForm
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
  const routingId = parseInt(ownProps.match.params.id);
  if (
    routingId &&
    state.selectedRoutingReducer.routing &&
    routingId === state.selectedRoutingReducer.routing.id
  ) {
    return {
      initialValues: state.selectedRoutingReducer.routing
    };
  } else {
    return {};
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(routingAction, dispatch)
});

AddOrEditRoutingContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  initialValues: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrEditRoutingContainer);
