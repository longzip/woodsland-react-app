import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as productAction from "../../action/ProductAction";
import * as uomAction from "../../action/UomAction";
import ProductForm from "./ProductForm";
import { uomsFormattedForDropdown } from "../../selectors/selectors";

export class AddOrEditProductContainer extends React.Component {
  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id)
      this.props.action
        .getProductAction(this.props.match.params.id)
        .catch(error => {
          toastr.error(error);
        });
    this.props.action.getUomsAction().catch(error => {
      toastr.error(error);
    });
  }

  handleSave(values) {
    const product = {
      id: values.id,
      code: values.code,
      name: values.name,
      description: values.description,
      type: values.type,
      uom: values.uom,
      listPrice: values.listPrice,
      active: values.active,
      saleOk: values.saleOk,
      imageUrl: values.imageUrl,
      purchaseOk: values.purchaseOk
      // ProductCategoryId: values.ProductCategoryId.value
    };

    this.props.action
      .saveProductAction(product)
      .then(() => {
        toastr.success("Đã lưu thành công");
        this.props.history.push("/datas/products");
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.replace("/datas/products");
  }

  render() {
    const { initialValues, uoms } = this.props;
    const heading = initialValues && initialValues.id ? "Edit" : "Add";
    return (
      <div className="content-wrapper">
        <div className="container">
          <ProductForm
            heading={heading}
            uoms={uoms}
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
  const productId = parseInt(ownProps.match.params.id);
  const uoms = uomsFormattedForDropdown(state.uomsReducer.uoms);
  if (
    productId &&
    state.selectedProductReducer.product &&
    productId === state.selectedProductReducer.product.id
  ) {
    return {
      initialValues: state.selectedProductReducer.product,
      uoms
    };
  } else {
    return { uoms };
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...productAction, ...uomAction }, dispatch)
});

AddOrEditProductContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  initialValues: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrEditProductContainer);
