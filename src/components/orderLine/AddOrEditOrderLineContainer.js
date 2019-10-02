import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as orderLineAction from "../../action/OrderLineAction";
import OrderLineForm from "./OrderLineForm";

export class AddOrEditOrderLineContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id)
      this.props.action
        .getOrderLineAction(this.props.match.params.id)
        .catch(error => {
          toastr.error(error);
        });
  }

  handleSave(values) {
    const product = {
      id: values.id,
      code: values.code,
      name: values.name
    };

    this.props.action
      .saveOrderLineAction(product)
      .then(() => {
        toastr.success("Thêm sản phẩm thành công");
        this.props.history.push("/sales/order-lines");
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.replace("/sales/order-lines");
  }

  render() {
    const { initialValues } = this.props;
    const heading = initialValues && initialValues.id ? "Edit" : "Add";
    return (
      <div className="content-wrapper">
        <div className="container">
          <OrderLineForm
            heading={heading}
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
  const orderLineId = parseInt(ownProps.match.params.id);
  if (
    orderLineId &&
    state.selectedOrderLineReducer.orderLine &&
    orderLineId === state.selectedOrderLineReducer.orderLine.id
  ) {
    return {
      initialValues: state.selectedOrderLineReducer.orderLine
    };
  } else {
    return {};
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(orderLineAction, dispatch)
});

AddOrEditOrderLineContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  initialValues: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrEditOrderLineContainer);
