import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
// import * as uomAction from "../../action/UomAction";
import * as bomLineAction from "../../action/BomLineAction";
import BomLineList from "./BomLineList";
import ListButton from "../common/ListButton";

export class BomLineListContainer extends React.Component {
  constructor() {
    super();

    this.state = { selectedBomLineId: undefined };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  componentDidMount() {
    this.props.action.getBomLinesAction().catch(error => {
      toastr.error(error);
    });
  }

  handleAdd() {
    this.props.history.push("/settings/bom-line");
  }

  handleEdit() {
    const selectedBomLineId = this.state.selectedBomLineId;
    if (selectedBomLineId) {
      this.setState({ selectedBomLineId: undefined });
      this.props.history.push(`/settings/bom-line/${selectedBomLineId}`);
    }
  }

  handleDelete() {
    const selectedBomLineId = this.state.selectedBomLineId;

    if (selectedBomLineId) {
      this.setState({ selectedBomLineId: undefined });
      this.props.action.deleteBomLineAction(selectedBomLineId).catch(error => {
        toastr.error(error);
      });
    }
  }

  handleRowSelect(row, isSelected) {
    if (isSelected) {
      this.setState({ selectedBomLineId: row.id });
      this.props.action.setBomLineAction(row);
    }
  }

  render() {
    const { bomLines } = this.props;

    if (!bomLines) return <div>Loading...</div>;
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card mt-3">
            <div className="card-header">
              <h3 className="card-title">Dòng định mức vật tư</h3>
            </div>
            <div className="card-footer clearfix">
              <ListButton
                handleAdd={this.handleAdd}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
              />
            </div>
            <div className="card-body p-0">
              <BomLineList
                bomLines={bomLines}
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
  bomLines: state.bomLinesReducer.bomLines
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(bomLineAction, dispatch)
});

BomLineListContainer.propTypes = {
  bomLines: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BomLineListContainer);
