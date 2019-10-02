import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as quoterAction from "../../action/QuoteAction";
import * as productAction from "../../action/ProductAction";
import * as uomAction from "../../action/UomAction";
import * as orderLineAction from "../../action/OrderLineAction";
import * as contactAction from "../../action/ContactAction";
import OrderLineList from "../orderLine/OrderLineList";
import OrderLineForm from "../orderLine/OrderLineForm";
import moment from "moment";
import {
  productsFormattedForDropdown,
  uomsFormattedForDropdown,
  contactsFormattedForDropdown,
  subtotalSelector,
  taxSelector,
  totalSelector
} from "../../selectors/selectors";

const formatter = new Intl.NumberFormat("vi");

export class ShowQuoteContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedOrderLineId: undefined,
      allowAdd: false,
      selectedOrderLineRow: undefined
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.handleAllowAdd = this.handleAllowAdd.bind(this);
    this.handleSaveQuote = this.handleSaveQuote.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.action
        .getQuoteAction(this.props.match.params.id)
        .catch(error => {
          toastr.error(error);
        });

      this.props.action.getOrderLinesAction().catch(error => {
        toastr.error(error);
      });
    }

    this.props.action.getProductsAction().catch(error => {
      toastr.error(error);
    });

    this.props.action.getContactsAction().catch(error => {
      toastr.error(error);
    });

    this.props.action.getUomsAction().catch(error => {
      toastr.error(error);
    });
    console.log(this.props);
  }

  handleSaveQuote(values) {
    const order = {
      id: values.id,
      description: values.description,
      version: values.version,
      dateFinished: values.dateFinished,
      ContactId: values.ContactId,
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

  handleSave(values) {
    const orderLine = {
      id: values.id,
      name: values.name,
      productDimension: values.productDimension,
      productSpec: values.productSpec,
      productUom: values.productUom.value,
      productUomQty: values.productUomQty,
      productPrice: values.productPrice,
      note: values.note,
      state: values.state,
      OrderId: this.props.initialValues.id,
      ProductId: values.product.value,
      ContactId: this.props.initialValues.Contact.id
    };

    this.props.action
      .saveOrderLineAction(orderLine)
      .then(() => {
        toastr.success("Đã thêm vào báo giá báo giá");
        this.props.action.resetForm("OrderLineForm");
        // this.props.history.push("/sales/quotes");
        this.props.action.getOrderLinesAction().catch(error => {
          toastr.error(error);
        });
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.replace("/sales/quotes");
  }

  handleDelete() {
    const selectedOrderLineId = this.state.selectedOrderLineId;

    if (selectedOrderLineId) {
      this.setState({ selectedOrderLineId: undefined });
      this.props.action
        .deleteOrderLineAction(selectedOrderLineId)
        .then(() => {
          toastr.success("Đã bỏ sản phẩm trong báo giá");
          // this.props.history.push("/sales/quotes");
          this.props.action.getOrderLinesAction().catch(error => {
            toastr.error(error);
          });
        })
        .catch(error => {
          toastr.error(error);
        });
    }
  }

  handleRowSelect(row, isSelected) {
    if (isSelected) {
      this.setState({ selectedOrderLineId: row.id });
      this.setState({ selectedOrderLineRow: row });
      this.props.action.getOrderLineAction(row.id).catch(error => {
        toastr.error(error);
      });
    }
  }

  handleAllowAdd() {
    this.setState({ allowAdd: !this.state.allowAdd });
  }

  render() {
    const {
      initialValues,
      orderLines,
      products,
      uoms,
      selectedOrderLineRow,
      subtotal,
      tax,
      total
    } = this.props;
    const dt = new Date(Date.now());
    const { allowAdd } = this.state;

    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Báo giá</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Báo giá</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                {/* <div className="callout callout-info">
                  <h5>
                    <i className="fas fa-info"></i> Note:
                  </h5>
                  This page has been enhanced for printing. Click the print
                  button at the bottom of the invoice to test.
                </div> */}
                <div className="invoice p-3 mb-3">
                  <div className="row">
                    <div className="col-12">
                      <h4>
                        <i className="fas fa-globe"></i> Woodland furniture.
                        <small className="float-right">
                          Date: {dt.toLocaleDateString("vi-VN")}
                        </small>
                      </h4>
                    </div>
                  </div>
                  <div className="row invoice-info">
                    <div className="col-sm-4 invoice-col">
                      Từ
                      <address>
                        <strong>CÔNG TY CỔ PHẦN WOODSLAND</strong>
                        <br />
                        Lô số 11, KCN Quang Minh, Thị trấn Quang Minh
                        <br />
                        Huyện Mê Linh, Thành phố Hà Nội
                        <br />
                        Phone: 02435840112
                        <br />
                        Email: info@woodsland.com.vn
                      </address>
                    </div>
                    <div className="col-sm-4 invoice-col">
                      Đến
                      {initialValues && (
                        <address>
                          <strong>{initialValues.Contact.description}</strong>
                          <br />
                          {initialValues.Contact.addressLine}
                          <br />
                          {initialValues.Contact.city}
                          <br />
                          Phone: {initialValues.Contact.phone}
                          <br />
                          Email: {initialValues.Contact.email}
                        </address>
                      )}
                    </div>
                    {initialValues && (
                      <div className="col-sm-4 invoice-col">
                        <b>Số ID # {initialValues.id}</b>
                        <br />
                        <br />
                        <b>Lần:</b> {initialValues.version}
                        <br />
                        <b>Tạo ngày:</b>{" "}
                        {moment(initialValues.createdAt).format("L")}
                        <br />
                        <b>Nhân viên:</b>
                        {initialValues.User.name +
                          " - " +
                          initialValues.User.id}
                      </div>
                    )}
                  </div>

                  {allowAdd && (
                    <OrderLineForm
                      heading="Add"
                      products={products}
                      uoms={uoms}
                      handleSave={this.handleSave}
                      handleCancel={this.handleAllowAdd}
                      initialValues={null}
                    />
                  )}
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Dòng sản phẩm</h3>
                      <div className="card-tools no-print">
                        <div class="input-group-append">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={this.handleAllowAdd}
                          >
                            Thêm <i class="far fa-plus-square"></i>
                          </button>
                          {selectedOrderLineRow && (
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={this.handleAllowAdd}
                            >
                              Sửa <i class="far fa-plus-square"></i>
                            </button>
                          )}
                          <button
                            type="submit"
                            className="btn btn-danger"
                            onClick={this.handleDelete}
                          >
                            Xóa <i class="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="card-body p-0">
                      <OrderLineList
                        orderLines={orderLines}
                        handleRowSelect={this.handleRowSelect}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      {/* <p className="lead">Payment Methods:</p>
                      <p
                        className="text-muted well well-sm shadow-none"
                        style={{ marginTop: "10px" }}
                      >
                        Etsy doostang zoodles disqus groupon greplin oooj voxy
                        zoodles, weebly ning heekya handango imeem plugg dopplr
                        jibjab, movity jajah plickers sifteo edmodo ifttt
                        zimbra.
                      </p> */}
                    </div>

                    <div className="col-6">
                      {initialValues && (
                        <p className="lead">
                          Ngày hết hạn{" "}
                          {moment(initialValues.dateFinished).format("L")}
                        </p>
                      )}

                      <div className="table-responsive">
                        <table className="table">
                          <tr>
                            <th style={{ width: "50%" }}>Tổng cộng:</th>
                            <td>{formatter.format(subtotal)}</td>
                          </tr>
                          <tr>
                            <th>VAT (10%)</th>
                            <td>{formatter.format(tax)}</td>
                          </tr>
                          <tr>
                            <th>Thành tiền:</th>
                            <td>{formatter.format(total)}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
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
  const quoteId = parseInt(ownProps.match.params.id);
  const subtotal = subtotalSelector(state);
  const tax = taxSelector(state);
  const total = totalSelector(state);
  if (
    quoteId &&
    state.selectedQuoteReducer.quote &&
    quoteId === state.selectedQuoteReducer.quote.id
  ) {
    return {
      initialValues: state.selectedQuoteReducer.quote,
      products: productsFormattedForDropdown(state),
      uoms: uomsFormattedForDropdown(state),
      contacts: contactsFormattedForDropdown(state),
      orderLines: state.orderLinesReducer.orderLines,
      currentUser: state.loginedUserReducer.userAuth,
      subtotal,
      tax,
      total
    };
  } else {
    return {
      products: productsFormattedForDropdown(state),
      uoms: uomsFormattedForDropdown(state),
      contacts: contactsFormattedForDropdown(state),
      orderLines: state.orderLinesReducer.orderLines,
      currentUser: state.loginedUserReducer.userAuth,
      subtotal,
      tax,
      total
    };
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(
    {
      ...productAction,
      ...quoterAction,
      ...orderLineAction,
      ...contactAction,
      ...uomAction
    },
    dispatch
  )
});

ShowQuoteContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  initialValues: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowQuoteContainer);
