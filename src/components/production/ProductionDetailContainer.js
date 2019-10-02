import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as productionAction from "../../action/ProductionAction";
import * as workorderAction from "../../action/WorkorderAction";
import * as routingWorkcenterAction from "../../action/RoutingWorkcenterAction";

export class ProductionDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProductionId: undefined,
      showAdd: true
    };
    // this.handleRowSelect = this.handleRowSelect.bind(this);
    // this.handleSaveProduction = this.handleSaveProduction.bind(this);
    // this.handleCancel = this.handleCancel.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    const { getProductionAction } = this.props.action;
    if (id) {
      getProductionAction(id).catch(error => {
        toastr.error(error);
      });
    }
  }

  render() {
    console.log("props kdkfjksjdkfjskdfjksd");
    console.log(this.props.production);
    const { production } = this.props;
    if (!production)
      return <div className="content-wrapper">Đang tải dữ liệu</div>;
    return (
      <div>
        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Bóc tách sản phẩm</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-8 order-2 order-md-1">
                  hello
                </div>
                <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
                  <h3 className="text-primary">{production.name}</h3>
                  <p className="lead">{production.state}</p>
                  <br></br>
                  <div className="text-muted">
                    <p className="text-sm">
                      Sản phẩm
                      <b className="d-block">{production.productDimension}</b>
                      <b className="d-block">{production.productQty}</b>
                      <b className="d-block">{production.productUom}</b>
                      <b className="d-block">
                        {production.Contact && production.Contact.addressLine}
                      </b>
                      <b className="d-block">
                        {production.Contact && production.Contact.city}
                      </b>
                    </p>
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
  const productionId = parseInt(ownProps.match.params.id);
  const workorders = state.workordersReducer.productions;
  const routingWorkcenters = state.routingWorkcentersReducer.routingWorkcenters;
  if (
    productionId &&
    state.selectedProductionReducer.production &&
    productionId === state.selectedProductionReducer.production.id
  ) {
    return {
      production: state.selectedProductionReducer.production,
      workorders,
      routingWorkcenters
    };
  } else {
    return {};
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(
    {
      ...productionAction,
      ...workorderAction,
      ...routingWorkcenterAction
    },
    dispatch
  )
});

ProductionDetailContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  contact: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductionDetailContainer);
