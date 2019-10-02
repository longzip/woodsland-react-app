import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as contactAction from "../../action/ContactAction";
import ContactList from "./ContactList";
import ListButton from "../common/ListButton";

export class ContactListContainer extends Component {
  constructor() {
    super();

    this.state = { selectedContactId: undefined };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  componentDidMount() {
    this.props.action.getContactsAction().catch(error => {
      toastr.error(error);
    });
  }

  handleAdd() {
    this.props.history.push("/sales/contact");
  }

  handleEdit() {
    const selectedContactId = this.state.selectedContactId;
    if (selectedContactId) {
      this.setState({ selectedContactId: undefined });
      this.props.history.push(`/sales/contact/${selectedContactId}`);
    }
  }

  handleDelete() {
    const selectedContactId = this.state.selectedContactId;

    if (selectedContactId) {
      this.setState({ selectedContactId: undefined });
      this.props.action.deleteContactAction(selectedContactId).catch(error => {
        toastr.error(error);
      });
    }
  }

  handleRowSelect(row, isSelected) {
    if (isSelected) {
      this.setState({ selectedContactId: row.id });
    }
  }

  render() {
    const { contacts } = this.props;

    if (!contacts) return <div>Đang tải...</div>;
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card mt-3">
            <div className="card-header">
              <h3 className="card-title">Dự án</h3>
            </div>
            <div className="card-footer clearfix">
              <ListButton
                handleAdd={this.handleAdd}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
              />
            </div>
            <div className="card-body p-0">
              <ContactList
                contacts={contacts}
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
  contacts: state.contactsReducer.contacts
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(contactAction, dispatch)
});

ContactListContainer.propTypes = {
  contacts: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactListContainer);
