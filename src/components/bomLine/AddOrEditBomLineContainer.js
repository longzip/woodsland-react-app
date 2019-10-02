import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as bomLineAction from "../../action/BomLineAction";
import * as productAction from "../../action/ProductAction";
import BomLineForm from "./BomLineForm";
import { productsFormattedForDropdown } from "../../selectors/selectors";

export class AddOrEditBomLineContainer extends React.Component {
  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    // if (this.props.match.params.id)
    // this.props.action
    //   .getBomLineAction(this.props.match.params.id)
    //   .catch(error => {
    //     toastr.error(error);
    //   });

    // });
    this.props.action.getProductsAction().catch(error => {
      toastr.error(error);
    });
  }

  handleSave(values) {
    const bomLine = {
      id: values.id,
      productQty: values.productQty,
      productUom: values.Product.uom,
      // operationId: values.operationId,
      // BomId: values.Bom.value,
      // RoutingId: values.Routing.value,
      ProductId: values.Product.value
    };

    this.props.action
      .saveBomLineAction(bomLine)
      .then(() => {
        toastr.success("Saved");
        this.props.history.push("/settings/bom-lines");
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.replace("/settings/bom-lines");
  }

  render() {
    const { initialValues, products } = this.props;
    const heading = initialValues && initialValues.id ? "Edit" : "Add";
    console.log("Chon bomline");
    console.log(this.props.initialValues);
    return (
      <div className="content-wrapper">
        <div className="container">
          <BomLineForm
            heading={heading}
            products={products}
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
  const id = parseInt(ownProps.match.params.id);
  if (
    id &&
    state.selectedBomLineReducer.bomLine &&
    id === state.selectedBomLineReducer.bomLine.id
  ) {
    return {
      initialValues: state.selectedBomLineReducer.bomLine,
      products: productsFormattedForDropdown(state.productsReducer.products)
    };
  } else {
    return {
      products: productsFormattedForDropdown(state.productsReducer.products)
    };
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...bomLineAction, ...productAction }, dispatch)
});

AddOrEditBomLineContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  initialValues: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrEditBomLineContainer);
