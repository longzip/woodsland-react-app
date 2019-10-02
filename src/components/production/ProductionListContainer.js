import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as productionAction from "../../action/ProductionAction";
import ProductionList from "./ProductionList";
import ListButton from "../common/ListButton";

export class ProductionListContainer extends React.Component {
  constructor() {
    super();

    this.state = { selectedProductionId: undefined };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  componentDidMount() {
    this.props.action.getProductionsAction().catch(error => {
      toastr.error(error);
    });
  }

  handleAdd() {
    this.props.history.push("/mrp/production");
  }

  handleEdit() {
    const selectedProductionId = this.state.selectedProductionId;
    if (selectedProductionId) {
      this.setState({ selectedProductionId: undefined });
      this.props.history.push(`/mrp/production/${selectedProductionId}`);
    }
  }

  handleDelete() {
    const selectedProductionId = this.state.selectedProductionId;

    if (selectedProductionId) {
      this.setState({ selectedProductionId: undefined });
      this.props.action
        .deleteProductionAction(selectedProductionId)
        .catch(error => {
          toastr.error(error);
        });
    }
  }

  handleRowSelect(row, isSelected) {
    if (isSelected) {
      this.setState({ selectedProductionId: row.id });
    }
  }

  render() {
    const { productions } = this.props;

    if (!productions) return <div>Loading...</div>;
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card mt-3">
            <div className="card-header">
              <h3 className="card-title">Lệnh sản xuất</h3>
            </div>
            <div className="card-footer clearfix">
              <ListButton
                handleAdd={this.handleAdd}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
              />
            </div>
            <div className="card-body p-0">
              <ProductionList
                productions={productions}
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
  productions: state.productionsReducer.productions
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(productionAction, dispatch)
});

ProductionListContainer.propTypes = {
  productions: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductionListContainer);
