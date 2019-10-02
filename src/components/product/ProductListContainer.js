import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as productAction from "../../action/ProductAction";
import ProductList from "./ProductList";
import ListButton from "../common/ListButton";

export class ProductListContainer extends React.Component {
  constructor() {
    super();

    this.state = { selectedProductId: undefined };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  componentDidMount() {
    this.props.action.getProductsAction().catch(error => {
      toastr.error(error);
    });
  }

  handleAdd() {
    this.props.history.push("/datas/product");
  }

  handleEdit() {
    const selectedProductId = this.state.selectedProductId;
    if (selectedProductId) {
      this.setState({ selectedProductId: undefined });
      this.props.history.push(`/datas/product/${selectedProductId}`);
    }
  }

  handleDelete() {
    const selectedProductId = this.state.selectedProductId;

    if (selectedProductId) {
      this.setState({ selectedProductId: undefined });
      this.props.action.deleteProductAction(selectedProductId).catch(error => {
        toastr.error(error);
      });
    }
  }

  handleRowSelect(row, isSelected) {
    if (isSelected) {
      this.setState({ selectedProductId: row.id });
    }
  }

  render() {
    const { products } = this.props;

    if (!products) return <div>Loading...</div>;
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card mt-3">
            <div className="card-header">
              <h3 className="card-title">Sản phẩm</h3>
            </div>
            <div className="card-footer clearfix">
              <ListButton
                handleAdd={this.handleAdd}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
              />
            </div>
            <div className="card-body p-0">
              <ProductList
                products={products}
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
  products: state.productsReducer.products
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(productAction, dispatch)
});

ProductListContainer.propTypes = {
  products: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListContainer);
