import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as userAction from "../../action/UserAction";
import UserList from "./UserList";
import ListButton from "../common/ListButton";

export class UserListContainer extends Component {
  constructor() {
    super();

    this.state = { selectedUserId: undefined };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  componentDidMount() {
    this.props.action.getUsersAction().catch(error => {
      toastr.error(error);
    });
  }

  handleAdd() {
    this.props.history.push("/settings/user");
  }

  handleEdit() {
    const selectedUserId = this.state.selectedUserId;
    if (selectedUserId) {
      this.setState({ selectedUserId: undefined });
      this.props.history.push(`/settings/user/${selectedUserId}`);
    }
  }

  handleDelete() {
    const selectedUserId = this.state.selectedUserId;

    if (selectedUserId) {
      this.setState({ selectedUserId: undefined });
      this.props.action.deleteUserAction(selectedUserId).catch(error => {
        toastr.error(error);
      });
    }
  }

  handleRowSelect({ id }, isSelected) {
    if (isSelected) {
      this.setState({ selectedUserId: id });
    }
  }

  render() {
    const { users } = this.props;

    if (!users) return <div>Loading...</div>;
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Tài khoản người dùng</h3>
            </div>
            <div className="card-header">
              <ListButton
                handleAdd={this.handleAdd}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
              />
            </div>
            <div className="card-body p-0">
              <UserList users={users} handleRowSelect={this.handleRowSelect} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.usersReducer.users
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(userAction, dispatch)
});

UserListContainer.propTypes = {
  users: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListContainer);
