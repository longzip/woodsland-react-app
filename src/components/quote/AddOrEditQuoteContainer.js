import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as quoterAction from "../../action/QuoteAction";
import * as contactAction from "../../action/ContactAction";
import QuoteForm from "./QuoteForm";
import { contactsFormattedForDropdown } from "../../selectors/selectors";

export class AddOrEditQuoteContainer extends React.Component {
  constructor() {
    super();
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSaveQuote = this.handleSaveQuote.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.action
        .getQuoteAction(this.props.match.params.id)
        .catch(error => {
          toastr.error(error);
        });
    }

    this.props.action.getContactsAction().catch(error => {
      toastr.error(error);
    });
  }

  handleSaveQuote(values) {
    const order = {
      id: values.id,
      description: values.description,
      version: values.version,
      dateFinished: values.dateFinished,
      ContactId: values.Contact.value,
      UserId: this.props.currentUser.id
    };

    this.props.action
      .saveQuoteAction(order)
      .then(() => {
        toastr.success("Đã lưu báo giá");
        this.props.history.push("/sales/quotes");
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.replace("/sales/quotes");
  }

  render() {
    const { initialValues, contacts } = this.props;
    const heading = initialValues && initialValues.id ? "Edit" : "Add";

    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <QuoteForm
              heading={heading}
              quote={initialValues}
              contacts={contacts}
              handleSave={this.handleSaveQuote}
              handleCancel={this.handleCancel}
              initialValues={this.props.initialValues}
            />
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const contacts = contactsFormattedForDropdown(state);
  const currentUser = state.loginedUserReducer.userAuth;
  const initialValues = state.selectedQuoteReducer.quote;
  const quoteId = parseInt(ownProps.match.params.id);
  if (quoteId && initialValues && quoteId === initialValues.id) {
    return {
      initialValues,
      contacts,
      currentUser
    };
  } else {
    return {
      contacts,
      currentUser
    };
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(
    {
      ...quoterAction,
      ...contactAction
    },
    dispatch
  )
});

AddOrEditQuoteContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  initialValues: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrEditQuoteContainer);
