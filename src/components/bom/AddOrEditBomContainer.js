import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as bomAction from "../../action/BomAction";
import * as productAction from "../../action/ProductAction";
import * as routingAction from "../../action/RoutingAction";
import {
  productsFormattedForDropdown,
  routingsFormattedForDropdown
} from "../../selectors/selectors";
import BomForm from "./BomForm";

export class AddOrEditBomContainer extends React.Component {
  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id)
      this.props.action
        .getBomAction(this.props.match.params.id)
        .catch(error => {
          toastr.error(error);
        });
    this.props.action.getProductsAction().catch(error => {
      toastr.error(error);
    });
    this.props.action.getRoutingsAction().catch(error => {
      toastr.error(error);
    });
  }

  handleSave(values) {
    console.log("values");
    console.log(values);
    const bom = {
      id: values.id,
      name: values.name,
      productQty: values.productQty,
      productUom: values.Product ? values.Product.uom : values.ProductId.uom,
      ProductId: values.Product ? values.Product.value : values.ProductId.value,
      RoutingId: values.RoutingId
    };

    this.props.action
      .saveBomAction(bom)
      .then(() => {
        toastr.success("Đã lưu thành công");
        this.props.history.push("/datas/boms");
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.replace("/datas/boms");
  }

  render() {
    const { initialValues, products, routings } = this.props;
    const heading = initialValues && initialValues.id ? "Edit" : "Add";
    return (
      <div className="content-wrapper">
        <div className="container">
          <BomForm
            heading={heading}
            products={products}
            routings={routings}
            handleSave={this.handleSave}
            handleCancel={this.handleCancel}
            initialValues={initialValues}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const bomId = parseInt(ownProps.match.params.id);
  if (
    bomId &&
    state.selectedBomReducer.bom &&
    bomId === state.selectedBomReducer.bom.id
  ) {
    return {
      initialValues: state.selectedBomReducer.bom,
      routings: routingsFormattedForDropdown(state.routingsReducer.routings),
      products: productsFormattedForDropdown(state.productsReducer.products)
    };
  } else {
    return {
      routings: routingsFormattedForDropdown(state.routingsReducer.routings),
      products: productsFormattedForDropdown(state.productsReducer.products)
    };
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(
    { ...bomAction, ...productAction, ...routingAction },
    dispatch
  )
});

AddOrEditBomContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  initialValues: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrEditBomContainer);
