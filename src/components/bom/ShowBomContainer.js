import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as bomLineAction from "../../action/BomLineAction";
import * as bomAction from "../../action/BomAction";
import BomLineList from "../bomLine/BomLineList";

const cardTools = (
  <div className="card-tools">
    <button
      type="button"
      className="btn btn-tool"
      data-card-widget="collapse"
      data-toggle="tooltip"
      title="Collapse"
    >
      <i className="fas fa-minus"></i>
    </button>
    <button
      type="button"
      className="btn btn-tool"
      data-card-widget="remove"
      data-toggle="tooltip"
      title="Remove"
    >
      <i className="fas fa-times"></i>
    </button>
  </div>
);

export class ShowBomContainer extends React.Component {
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
    this.props.action
      .getBomLinesAction(this.props.match.params.id)
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
      .saveBomLineAction(product)
      .then(() => {
        toastr.success("Đã lưu thành công");
        this.props.history.push("/products");
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.replace("/products");
  }

  render() {
    const { initialValues, bomLines } = this.props;

    return (
      <div className="content-wrapper">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Chi tiết định mức NVL</h3>
              {cardTools}
            </div>
            <div className="cart-body">
              <div className="row">
                <div class="col-12 col-md-12 col-lg-8 order-2 order-md-1">
                  <div className="col-12">
                    <h4>Dòng sản phẩm</h4>
                    <BomLineList
                      bomLines={bomLines}
                      handleRowSelect={this.handleRowSelect}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
                  <h3 className="text-primary">
                    <i class="fas fa-paint-brush"></i>
                    {initialValues && initialValues.name}
                  </h3>
                </div>
              </div>
            </div>
          </div>
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
      bomLines: state.bomLinesReducer.bomLines
    };
  } else {
    return { bomLines: state.bomLinesReducer.bomLines };
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...bomAction, ...bomLineAction }, dispatch)
});

ShowBomContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  initialValues: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowBomContainer);
