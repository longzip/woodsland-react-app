import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as contactAction from "../../action/ContactAction";
import ContactForm from "./ContactForm";

export class AddOrEditContactContainer extends React.Component {
  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    if (id)
      this.props.action.getContactAction(id).catch(error => {
        toastr.error(error);
      });
  }

  handleSave(values) {
    const contact = {
      id: values.id,
      description: values.description,
      phone: values.phone,
      email: values.email,
      name: values.name,
      addressLine: values.addressLine,
      city: values.city,
      note: values.note
    };

    this.props.action
      .saveContactAction(contact)
      .then(() => {
        toastr.success("Đã lưu thông tin khách hàng");
        this.props.history.push("/sales/contacts");
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.replace("/sales/contacts");
  }

  render() {
    const { initialValues } = this.props;
    const heading = initialValues && initialValues.id ? "Edit" : "Add";
    return (
      <div className="content-wrapper">
        <div className="container">
          <ContactForm
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
  const contactId = parseInt(ownProps.match.params.id);
  if (
    contactId &&
    state.selectedContactReducer.contact &&
    contactId === state.selectedContactReducer.contact.id
  ) {
    return {
      initialValues: state.selectedContactReducer.contact
    };
  } else {
    return {};
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(contactAction, dispatch)
});

AddOrEditContactContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  initialValues: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrEditContactContainer);
