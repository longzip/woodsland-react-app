import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as contactAction from "../../action/ContactAction";
import * as quoteAction from "../../action/QuoteAction";
import * as documentAction from "../../action/DocumentAction";
import QuoteList from "../quote/QuoteList";
import ListButton from "../common/ListButton";
import QuoteForm from "../quote/QuoteForm";
import UploadForm from "../upload/UploadForm";

class ContactDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedQuoteId: undefined,
      allowAdd: false,
      showUpload: false
    };
    this.handleAllowAdd = this.handleAllowAdd.bind(this);
    this.handleSaveQuote = this.handleSaveQuote.bind(this);
    this.handleDeleteQuote = this.handleDeleteQuote.bind(this);
    this.handleRowSelectQuote = this.handleRowSelectQuote.bind(this);
    this.handleEditQuote = this.handleEditQuote.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    if (id)
      this.props.action.getContactAction(id).catch(error => {
        toastr.error(error);
      });
    this.props.action.getDocumentsAction(id).catch(error => {
      toastr.error(error);
    });
    this.props.action.getQuotesAction(id).catch(error => {
      toastr.error(error);
    });
  }
  handleAllowAdd() {
    this.setState({ allowAdd: !this.state.allowAdd });
  }
  handleRowSelectQuote(row, isSelected) {
    if (isSelected) {
      this.setState({ selectedQuoteId: row.id });
    }
  }
  handleDeleteQuote() {
    const selectedQuoteId = this.state.selectedQuoteId;

    if (selectedQuoteId) {
      this.setState({ selectedQuoteId: undefined });
      this.props.action.deleteQuoteAction(selectedQuoteId).catch(error => {
        toastr.error(error);
      });
      this.props.action.getQuotesAction(this.props.contact.id).catch(error => {
        toastr.error(error);
      });
    }
  }
  handleSaveQuote(values) {
    const { contact, currentUser } = this.props;
    const order = {
      id: values.id,
      description: values.description,
      version: values.version,
      dateFinished: values.dateFinished,
      ContactId: contact.id,
      UserId: currentUser.id
    };

    this.props.action
      .saveQuoteAction(order)
      .then(() => {
        toastr.success("Đã lưu báo giá");
        //
        // this.props.history.push("/sales/quotes");
        this.props.action
          .getQuotesAction(this.props.contact.id)
          .catch(error => {
            toastr.error(error);
          });
        this.props.action.resetForm("QuoteForm");
      })
      .catch(error => {
        toastr.error(error);
      });
  }
  handleEditQuote() {}
  handleFileUpload(values) {
    let formData = new FormData();
    if (values.id) formData.append("id", values.id);
    formData.append("name", values.name);
    formData.append("uploadFile", values.uploadFile[0]);
    formData.append("ContactId", this.props.contact.id);
    this.props.action
      .saveDocumentAction(formData)
      .then(() => {
        toastr.success("Đã thêm file");
        //
        this.props.action
          .getDocumentsAction(this.props.contact.id)
          .catch(error => toastr.error(error));
        this.props.action.resetForm("UploadForm");
      })
      .catch(error => {
        toastr.error(error);
      });
  }
  render() {
    const { contact, quotes, documents } = this.props;
    const { allowAdd } = this.state;
    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Thông tin dự án</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-8 order-2 order-md-1">
                  {quotes && (
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">Báo giá</h3>
                      </div>

                      <div className="card-body p-0">
                        <QuoteList
                          quotes={quotes}
                          handleRowSelect={this.handleRowSelect}
                        />
                      </div>
                      <div className="card-footer clearfix">
                        <ListButton
                          handleAdd={this.handleAllowAdd}
                          handleDelete={this.handleDeleteQuote}
                          handleEdit={this.handleEditQuote}
                        />
                      </div>
                    </div>
                  )}
                  {allowAdd && (
                    <QuoteForm
                      heading="Add"
                      handleSave={this.handleSaveQuote}
                      handleCancel={this.handleAllowAdd}
                      initialValues={null}
                    />
                  )}
                </div>
                {contact && (
                  <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
                    <h3 className="text-primary">{contact.name}</h3>
                    <p className="lead">{contact.description}</p>
                    <p className="text-muted">{contact.note}</p>
                    <br></br>
                    <div className="text-muted">
                      <p className="text-sm">
                        Đầu mối liên hệ
                        <b className="d-block">{contact.phone}</b>
                        <b className="d-block">{contact.email}</b>
                        <b className="d-block">{contact.addressLine}</b>
                        <b className="d-block">{contact.city}</b>
                      </p>
                      <p className="text-sm">
                        Sản phẩm
                        <b className="d-block">Cửa</b>
                        <b className="d-block">Nội thất</b>
                        <b className="d-block">Khối lượng</b>
                      </p>
                      <p className="text-sm">
                        Tình trạng dự án
                        <b className="d-block">Chưa xây dựng</b>
                        <b className="d-block">Đã xây dựng</b>
                      </p>
                      <p className="text-sm">
                        Các nhà thầu khác tham gia báo giá
                        <b className="d-block">...</b>
                      </p>
                    </div>
                    <h5 className="mt-5 text-muted">Tài liệu</h5>
                    <ul className="list-unstyled">
                      {documents.map(document => {
                        return (
                          <li>
                            <a
                              target="_blank"
                              href={`http://localhost:5000/${document.fileUrl}`}
                              className="btn-link text-secondary"
                            >
                              <i className="far fa-fw fa-file-word"></i>
                              {document.name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>

                    {this.state.showUpload && (
                      <UploadForm
                        handleSave={this.handleFileUpload}
                        handleCancel={() =>
                          this.setState({ showUpload: false })
                        }
                        initialValues={null}
                      />
                    )}

                    <div className="text-center mt-5 mb-3">
                      <button
                        onClick={() => this.setState({ showUpload: true })}
                        className="btn btn-sm btn-primary"
                      >
                        Add files
                      </button>
                      <a href="/sales/contacts" class="btn btn-sm btn-warning">
                        Đóng
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const contactId = parseInt(ownProps.match.params.id);
  const currentUser = state.loginedUserReducer.userAuth;
  const documents = state.documentsReducer.documents;
  if (
    contactId &&
    state.selectedContactReducer.contact &&
    contactId === state.selectedContactReducer.contact.id
  ) {
    return {
      contact: state.selectedContactReducer.contact,
      quotes: state.quotesReducer.quotes,
      currentUser,
      documents
    };
  } else {
    return {};
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(
    { ...contactAction, ...quoteAction, ...documentAction },
    dispatch
  )
});

ContactDetailContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  contact: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactDetailContainer);
