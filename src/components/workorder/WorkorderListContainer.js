import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as workorderAction from "../../action/WorkorderAction";
import WorkorderList from "./WorkorderList";
import ListButton from "../common/ListButton";

export class WorkorderListContainer extends React.Component {
  constructor() {
    super();

    this.state = { selectedWorkorderId: undefined };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  componentDidMount() {
    this.props.action.getWorkordersAction().catch(error => {
      toastr.error(error);
    });
  }

  handleAdd() {
    this.props.history.push("/mrp/workorder");
  }

  handleEdit() {
    const selectedWorkorderId = this.state.selectedWorkorderId;
    if (selectedWorkorderId) {
      this.setState({ selectedWorkorderId: undefined });
      this.props.history.push(`/mrp/workorder/${selectedWorkorderId}`);
    }
  }

  handleDelete() {
    const selectedWorkorderId = this.state.selectedWorkorderId;

    if (selectedWorkorderId) {
      this.setState({ selectedWorkorderId: undefined });
      this.props.action.deleteUomAction(selectedWorkorderId).catch(error => {
        toastr.error(error);
      });
    }
  }

  handleRowSelect(row, isSelected) {
    if (isSelected) {
      this.setState({ selectedWorkorderId: row.id });
    }
  }

  render() {
    const { workorders } = this.props;

    if (!workorders) return <div>Loading...</div>;
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card mt-3">
            <div className="card-header">
              <h3 className="card-title">Lệnh làm việc</h3>
            </div>
            <div className="card-footer clearfix">
              <ListButton
                handleAdd={this.handleAdd}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
              />
            </div>
            <div className="card-body p-0">
              <WorkorderList
                workorders={workorders}
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
  workorders: state.workordersReducer.workorders
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(workorderAction, dispatch)
});

WorkorderListContainer.propTypes = {
  workorders: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkorderListContainer);
