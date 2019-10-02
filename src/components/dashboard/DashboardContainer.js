import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as quoteAction from "../../action/QuoteAction";
import * as contactAction from "../../action/ContactAction";
import * as productAction from "../../action/ProductAction";
import QuoteList from "../quote/QuoteList";
import ContactList from "../contact/ContactList";
import ProductList from "../product/ProductList";
import ProductWidget from "./ProductWidget";
// import InfoList from "./InfoList";

class DashboardContainer extends Component {
  componentDidMount() {
    this.props.action.getQuotesAction().catch(error => {
      toastr.error(error);
    });
    this.props.action.getContactsAction().catch(error => {
      toastr.error(error);
    });
    this.props.action.getProductsAction().catch(error => {
      toastr.error(error);
    });
  }
  render() {
    const { quotes, contacts, products } = this.props;
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Bảng tin</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Bảng tin</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            {/* <InfoList /> */}
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header border-transparent">
                    <h3 className="card-title">Đơn báo giá</h3>
                  </div>
                  <div className="card-body p-0">
                    <QuoteList quotes={quotes} />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header border-transparent">
                    <h3 className="card-title">Sản phẩm</h3>
                  </div>
                  <div className="card-body p-0">
                    <ProductWidget products={products} />
                  </div>
                  <div className="card-footer text-center">
                    <a href="/datas/products" className="uppercase">
                      Xem toàn bộ sản phẩm
                    </a>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header border-transparent">
                    <h3 className="card-title">Dự án</h3>
                  </div>
                  <div className="card-body p-0">
                    <ContactList contacts={contacts} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const quotes = state.quotesReducer.quotes;
  const contacts = state.contactsReducer.contacts;
  const products = state.productsReducer.products;
  return {
    quotes,
    contacts,
    products
  };
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(
    { ...quoteAction, ...contactAction, ...productAction },
    dispatch
  )
});

DashboardContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
