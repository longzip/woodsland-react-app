import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as quoteAction from "../../action/QuoteAction";
import QuoteList from "./QuoteList";
import ListButton from "../common/ListButton";

export class QuoteListContainer extends React.Component {
  constructor() {
    super();

    this.state = { selectedQuoteId: undefined };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  componentDidMount() {
    this.props.action.getQuotesAction().catch(error => {
      toastr.error(error);
    });
  }

  handleAdd() {
    this.props.history.push("/sales/quote");
  }

  handleEdit() {
    const selectedQuoteId = this.state.selectedQuoteId;
    if (selectedQuoteId) {
      this.setState({ selectedQuoteId: undefined });
      this.props.history.push(`/sales/quote/${selectedQuoteId}`);
    }
  }

  handleDelete() {
    const selectedQuoteId = this.state.selectedQuoteId;

    if (selectedQuoteId) {
      this.setState({ selectedQuoteId: undefined });
      this.props.action.deleteQuoteAction(selectedQuoteId).catch(error => {
        toastr.error(error);
      });
    }
  }

  handleRowSelect(row, isSelected) {
    if (isSelected) {
      this.setState({ selectedQuoteId: row.id });
    }
  }

  render() {
    const { quotes } = this.props;

    if (!quotes) {
      return <div>Đang tải dữ liệu...</div>;
    }

    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Báo giá</h3>
            </div>
            <div className="card-footer clearfix">
              <ListButton
                handleAdd={this.handleAdd}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
              />
            </div>
            <div className="card-body p-0">
              <QuoteList
                quotes={quotes}
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
  quotes: state.quotesReducer.quotes
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(quoteAction, dispatch)
});

QuoteListContainer.propTypes = {
  quotes: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteListContainer);
