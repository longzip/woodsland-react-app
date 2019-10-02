import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as routingAction from "../../action/RoutingAction";
import * as routingWorkcenterAction from "../../action/RoutingWorkcenterAction";
import * as workcenterAction from "../../action/WorkcenterAction";
import { workcentersFormattedForDropdown } from "../../selectors/selectors";
import RoutingWorkcenterList from "../routingWorkcenter/RoutingWorkcenterList";
import RoutingWorkcenterForm from "../routingWorkcenter/RoutingWorkcenterForm";
import ListButton from "../common/ListButton";

export class RoutingDetailContainer extends Component {
  constructor() {
    super();
    this.state = {
      selectedroutingWorkcenterId: undefined,
      showAdd: false
    };
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.handleSaveRoutingWorkcenter = this.handleSaveRoutingWorkcenter.bind(
      this
    );
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    const {
      getRoutingAction,
      getWorkcentersAction,
      getRoutingWorkcentersAction
    } = this.props.action;
    if (id) {
      getRoutingAction(id).catch(error => {
        toastr.error(error);
      });
      getWorkcentersAction().catch(error => {
        toastr.error(error);
      });
      getRoutingWorkcentersAction(id).catch(error => {
        toastr.error(error);
      });
    }
    console.log(this.props);
  }
  handleSaveRoutingWorkcenter(values) {
    const { routing } = this.props;
    const routingWorkcenter = {
      id: values.id,
      sequence: values.sequence,
      name: values.name,
      note: values.note,
      worksheet: values.worksheet,
      RoutingId: routing.id,
      WorkcenterId: values.Workcenter.value
    };
    this.props.action
      .saveRoutingWorkcenterAction(routingWorkcenter)
      .then(() => {
        toastr.success("Đã lưu");
        this.props.action
          .getRoutingWorkcentersAction(routing.id)
          .catch(error => {
            toastr.error(error);
          });
        this.handleCancel();
      })
      .catch(error => {
        toastr.error(error);
      });
  }
  handleRowSelect(row, isSelected) {
    if (isSelected) {
      this.setState({ selectedroutingWorkcenterId: row.id });
      //   toastr.error(row.id);
    }
  }
  handleCancel() {
    this.setState({
      showAdd: !this.state.showAdd
    });
  }
  handleDelete() {
    const selectedroutingWorkcenterId = this.state.selectedroutingWorkcenterId;
    const { routing } = this.props;
    if (selectedroutingWorkcenterId) {
      this.setState({ selectedroutingWorkcenterId: undefined });
      this.props.action
        .deleteRoutingWorkcenterAction(selectedroutingWorkcenterId)
        .then(() => {
          this.props.action.getRoutingWorkcentersAction(routing.id);
          toastr.success("Đã xóa");
        })
        .catch(error => {
          toastr.error(error);
        });
    }
  }
  render() {
    const { routing, workcenters, routingWorkcenters } = this.props;
    return (
      <div className="content-wrapper">
        <section className="content">
          {routing && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">{routing.name}</h3>
              </div>
              <div className="card-footer clearfix">
                <ListButton
                  handleAdd={this.handleCancel}
                  handleEdit={this.handleEdit}
                  handleDelete={this.handleDelete}
                />
              </div>
              <div className="card-body">
                <RoutingWorkcenterList
                  routingWorkcenters={routingWorkcenters}
                  handleRowSelect={this.handleRowSelect}
                />
              </div>
              <div className="card-footer">
                {this.state.showAdd && (
                  <RoutingWorkcenterForm
                    workcenters={workcenters}
                    handleSave={this.handleSaveRoutingWorkcenter}
                    handleCancel={this.handleCancel}
                    initialValues={null}
                    heading="Add"
                  />
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const routingId = parseInt(ownProps.match.params.id);
  const workcenters = workcentersFormattedForDropdown(state);
  const routingWorkcenters = state.routingWorkcentersReducer.routingWorkcenters;
  if (
    routingId &&
    state.selectedRoutingReducer.routing &&
    routingId === state.selectedRoutingReducer.routing.id
  ) {
    return {
      routing: state.selectedRoutingReducer.routing,
      workcenters,
      routingWorkcenters
    };
  } else {
    return {};
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(
    { ...routingAction, ...routingWorkcenterAction, ...workcenterAction },
    dispatch
  )
});

RoutingDetailContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  contact: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutingDetailContainer);
