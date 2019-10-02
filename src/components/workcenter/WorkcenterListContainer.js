import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as workcenterAction from "../../action/WorkcenterAction";
import WorkcenterList from "./WorkcenterList";
import ListButton from "../common/ListButton";

export class WorkcenterListContainer extends React.Component {
  constructor() {
    super();

    this.state = { selectedWorkcenterId: undefined };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  componentDidMount() {
    this.props.action.getWorkcentersAction().catch(error => {
      toastr.error(error);
    });
  }

  handleAdd() {
    this.props.history.push("/datas/workcenter");
  }

  handleEdit() {
    const selectedWorkcenterId = this.state.selectedWorkcenterId;
    console.log(selectedWorkcenterId);
    if (selectedWorkcenterId) {
      this.setState({ selectedWorkcenterId: undefined });
      this.props.history.push(`/datas/workcenter/${selectedWorkcenterId}`);
    }
  }

  handleDelete() {
    const selectedWorkcenterId = this.state.selectedWorkcenterId;

    if (selectedWorkcenterId) {
      this.setState({ selectedWorkcenterId: undefined });
      this.props.action
        .deleteWorkcenterAction(selectedWorkcenterId)
        .catch(error => {
          toastr.error(error);
        });
    }
  }

  handleRowSelect(row, isSelected) {
    console.log(row);
    if (isSelected) {
      this.setState({ selectedWorkcenterId: row.id });
    }
  }

  render() {
    const { workcenters } = this.props;

    if (!workcenters) return <div>Loading...</div>;
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card mt-3">
            <div className="card-header">
              <h3 className="card-title">Công đoạn sản xuất</h3>
            </div>
            <div className="card-footer clearfix">
              <ListButton
                handleAdd={this.handleAdd}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
              />
            </div>
            <div className="card-body p-0">
              <WorkcenterList
                workcenters={workcenters}
                handleRowSelect={this.handleRowSelect}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  workcenters: state.workcentersReducer.workcenters
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(workcenterAction, dispatch)
});

WorkcenterListContainer.propTypes = {
  workcenters: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkcenterListContainer);
