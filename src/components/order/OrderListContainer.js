import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as orderAction from "../../action/OrderAction";
import QuoteList from "../quote/QuoteList";
import ListButton from "../common/ListButton";

export class OrderListContainer extends React.Component {
  constructor() {
    super();

    this.state = { selectedOrderId: undefined };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  componentDidMount() {
    this.props.action.getOrdersAction().catch(error => {
      toastr.error(error);
    });
  }

  handleAdd() {
    this.props.history.push("/sales/order");
  }

  handleEdit() {
    const selectedOrderId = this.state.selectedOrderId;
    if (selectedOrderId) {
      this.setState({ selectedOrderId: undefined });
      this.props.history.push(`/sales/order/${selectedOrderId}`);
    }
  }

  handleDelete() {
    const selectedOrderId = this.state.selectedOrderId;

    if (selectedOrderId) {
      this.setState({ selectedOrderId: undefined });
      this.props.action.deleteOrderAction(selectedOrderId).catch(error => {
        toastr.error(error);
      });
    }
  }

  handleRowSelect(row, isSelected) {
    if (isSelected) {
      this.setState({ selectedOrderId: row.id });
    }
  }

  render() {
    const { orders } = this.props;

    if (!orders) {
      return <div>Đang tải dữ liệu...</div>;
    }

    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Đơn hàng</h3>
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
                quotes={orders}
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
  orders: state.ordersReducer.orders
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(orderAction, dispatch)
});

OrderListContainer.propTypes = {
  orders: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderListContainer);
