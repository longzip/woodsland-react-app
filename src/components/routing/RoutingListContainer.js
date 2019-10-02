import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as routingAction from "../../action/RoutingAction";
import RoutingList from "./RoutingList";
import ListButton from "../common/ListButton";

export class RoutingListContainer extends React.Component {
  constructor() {
    super();

    this.state = { selectedRoutingId: undefined };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  componentDidMount() {
    this.props.action.getRoutingsAction().catch(error => {
      toastr.error(error);
    });
  }

  handleAdd() {
    this.props.history.push("/datas/routing");
  }

  handleEdit() {
    const selectedRoutingId = this.state.selectedRoutingId;
    if (selectedRoutingId) {
      this.setState({ selectedRoutingId: undefined });
      this.props.history.push(`/datas/routing/${selectedRoutingId}`);
    }
  }

  handleDelete() {
    const selectedRoutingId = this.state.selectedRoutingId;

    if (selectedRoutingId) {
      this.setState({ selectedRoutingId: undefined });
      this.props.action.deleteRoutingAction(selectedRoutingId).catch(error => {
        toastr.error(error);
      });
    }
  }

  handleRowSelect(row, isSelected) {
    if (isSelected) {
      this.setState({ selectedRoutingId: row.id });
    }
  }

  render() {
    const { routings } = this.props;

    if (!routings) return <div>Loading...</div>;
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card mt-3">
            <div className="card-header">
              <h3 className="card-title">Quy trình sản xuất</h3>
            </div>
            <div className="card-footer clearfix">
              <ListButton
                handleAdd={this.handleAdd}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
              />
            </div>
            <div className="card-body p-0">
              <RoutingList
                routings={routings}
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
  routings: state.routingsReducer.routings
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(routingAction, dispatch)
});

RoutingListContainer.propTypes = {
  routings: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutingListContainer);
