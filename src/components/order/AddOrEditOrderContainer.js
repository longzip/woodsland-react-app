import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as orderAction from "../../action/OrderAction";
import OrderLineList from "../orderLine/OrderLineList";

export class AddOrEditOrderContainer extends React.Component {
  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id)
      this.props.action
        .getOrderAction(this.props.match.params.id)
        .catch(error => {
          toastr.error(error);
        });
  }

  handleSave(values) {
    const order = {
      id: values.id,
      code: values.code,
      name: values.name
    };

    this.props.action
      .saveOrderAction(order)
      .then(() => {
        toastr.success("Đã lưu báo giá");
        this.props.history.push("/sales/orders");
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.replace("/sales/orders");
  }

  render() {
    const { orderLines } = this.props;

    const { initialValues } = this.props;
    // const heading = initialValues && initialValues.id ? "Edit" : "Add";
    console.log(initialValues);
    return (
      <div className="content-wrapper">
        <div className="container">
          <OrderLineList
            orderLines={orderLines}
            handleRowSelect={this.handleRowSelect}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const orderId = parseInt(ownProps.match.params.id);
  if (
    orderId &&
    state.selectedOrderReducer.order &&
    orderId === state.selectedOrderReducer.order.id
  ) {
    return {
      initialValues: state.selectedOrderReducer.order
    };
  } else {
    return {};
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(orderAction, dispatch)
});

AddOrEditOrderContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  initialValues: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrEditOrderContainer);
