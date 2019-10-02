import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as orderLineAction from "../../action/OrderLineAction";
import * as productionAction from "../../action/ProductionAction";
import * as routingAction from "../../action/RoutingAction";
import * as productAction from "../../action/ProductAction";
import * as bomAction from "../../action/BomAction";
import ProductionForm from "../production/ProductionForm";
import ProductionList from "../production/ProductionList";
import {
  productsFormattedForDropdown,
  bomsFormattedForDropdown,
  routingsFormattedForDropdown
} from "../../selectors/selectors";
import ListButton from "../common/ListButton";

export class OrderLineDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProductionId: undefined,
      showAdd: true
    };
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.handleSaveProduction = this.handleSaveProduction.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    const {
      getOrderLineAction,
      getProductionsAction,
      getRoutingsAction,
      getProductsAction
    } = this.props.action;
    if (id) {
      getOrderLineAction(id).catch(error => {
        toastr.error(error);
      });
      getProductionsAction(id).catch(error => {
        toastr.error(error);
      });
      getRoutingsAction().catch(error => {
        toastr.error(error);
      });
      getProductsAction().catch(error => {
        toastr.error(error);
      });
    }
    console.log(this.props);
  }
  handleSaveProduction(values) {
    const production = {
      id: values.id,
      name: values.name,
      origin: values.origin,
      productQty: values.productQty,
      productUom: values.productUom,
      datePlannedStart: values.datePlannedStart,
      datePlannedFinished: values.datePlannedFinished,
      dateStart: values.dateStart,
      dateFinished: values.dateFinished,
      priority: values.priority,
      state: values.state,
      availability: values.availability,
      ProductId: values.Product.value,
      BomId: values.Bom ? values.Bom.value : undefined,
      RoutingId: values.Routing.value,
      OrderLineId: this.props.orderLine.id,
      ContactId: this.props.orderLine.ContactId
    };

    this.props.action
      .saveProductionAction(production)
      .then(() => {
        toastr.success("Đã lưu thành công");
        // this.props.history.push("/mrp/productions");
        this.props.action
          .getProductionsAction(this.props.orderLine.id)
          .catch(error => {
            toastr.error(error);
          });
        this.props.action.resetForm();
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.replace("/mrp/productions");
  }

  handleRowSelect(row, isSelected) {
    if (isSelected) {
      this.setState({ selectedProductionId: row.id });
      //   toastr.error(row.id);
    }
  }
  handleCancel() {
    this.setState({
      showAdd: !this.state.showAdd
    });
  }
  handleDelete() {
    const selectedProductionId = this.state.selectedProductionId;
    const { orderLine } = this.props;
    if (selectedProductionId) {
      this.setState({ selectedProductionId: undefined });
      this.props.action
        .deleteProductionAction(selectedProductionId)
        .then(() => {
          this.props.action.getProductionsAction(orderLine.id);
          toastr.success("Đã xóa");
        })
        .catch(error => {
          toastr.error(error);
        });
    }
  }
  render() {
    const { orderLine, productions, products, boms, routings } = this.props;
    // console.log(orderLine);
    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Bóc tách sản phẩm</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-8 order-2 order-md-1">
                  {productions && (
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">Chi tiết sản phẩm</h3>
                      </div>

                      <div className="card-body p-0">
                        <ProductionList
                          productions={productions}
                          handleRowSelect={this.handleRowSelect}
                        />
                      </div>
                      <div className="card-footer clearfix">
                        <ListButton
                          handleAdd={this.handleCancel}
                          handleDelete={this.handleDelete}
                          handleEdit={this.handleEditQuote}
                        />
                      </div>
                    </div>
                  )}
                  {this.state.showAdd && (
                    <ProductionForm
                      heading="Add"
                      products={products}
                      boms={boms}
                      routings={routings}
                      handleSave={this.handleSaveProduction}
                      handleCancel={this.handleCancel}
                      initialValues={null}
                    />
                  )}
                </div>
                {orderLine && (
                  <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
                    <h3 className="text-primary">{orderLine.productSpec}</h3>
                    <p className="lead">{orderLine.productDimension}</p>
                    <p className="text-muted">{orderLine.productUom}</p>
                    <br></br>
                    <div className="text-muted">
                      <p className="text-sm">
                        Dự án
                        <b className="d-block">{orderLine.Contact.name}</b>
                        <b className="d-block">{orderLine.Contact.phone}</b>
                        <b className="d-block">{orderLine.Contact.email}</b>
                        <b className="d-block">
                          {orderLine.Contact.addressLine}
                        </b>
                        <b className="d-block">{orderLine.Contact.city}</b>
                      </p>
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
  const orderLineId = parseInt(ownProps.match.params.id);
  const productions = state.productionsReducer.productions;
  const products = productsFormattedForDropdown(state);
  const boms = bomsFormattedForDropdown(state);
  const routings = routingsFormattedForDropdown(state);
  if (
    orderLineId &&
    state.selectedOrderLineReducer.orderLine &&
    orderLineId === state.selectedOrderLineReducer.orderLine.id
  ) {
    return {
      orderLine: state.selectedOrderLineReducer.orderLine,
      productions,
      products,
      boms,
      routings
    };
  } else {
    return {};
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(
    {
      ...routingAction,
      ...orderLineAction,
      ...productionAction,
      ...productAction,
      ...bomAction,
      ...routingAction
    },
    dispatch
  )
});

OrderLineDetailContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  contact: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderLineDetailContainer);
