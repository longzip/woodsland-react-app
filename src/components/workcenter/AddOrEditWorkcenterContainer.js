import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as workcenterAction from "../../action/WorkcenterAction";
import WorkcenterForm from "./WorkcenterForm";

export class AddOrEditWorkcenterContainer extends React.Component {
  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    if(this.props.match.params.id)
    this.props.action
      .getWorkcenterAction(this.props.match.params.id)
      .catch(error => {
        toastr.error(error);
      });
  }

  handleSave(values) {
    const item = {
      id: values.id,
      name: values.name
    };

    this.props.action
      .saveWorkcenterAction(item)
      .then(() => {
        toastr.success("Workcenter saved");
        this.props.history.push("/datas/workcenters");
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.replace("/datas/workcenters");
  }

  render() {
    const { initialValues } = this.props;
    const heading = initialValues && initialValues.id ? "Edit" : "Add";
    console.log(this.props.initialValues);
    return (
      <div className="content-wrapper">
        <div className="container">
          <WorkcenterForm
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
  const workcenterId = parseInt(ownProps.match.params.id);
  if (
    workcenterId &&
    state.selectedWorkcenterReducer.workcenter &&
    workcenterId === state.selectedWorkcenterReducer.workcenter.id
  ) {
    return {
      initialValues: state.selectedWorkcenterReducer.workcenter
    };
  } else {
    return {};
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(workcenterAction, dispatch)
});

AddOrEditWorkcenterContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  initialValues: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrEditWorkcenterContainer);
