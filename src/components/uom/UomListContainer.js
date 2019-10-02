import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as uomAction from "../../action/UomAction";
import UomList from "./UomList";
import ListButton from "../common/ListButton";

export class UomListContainer extends React.Component {
  constructor() {
    super();

    this.state = { selectedUomId: undefined };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  componentDidMount() {
    this.props.action.getUomsAction().catch(error => {
      toastr.error(error);
    });
  }

  handleAdd() {
    this.props.history.push("/settings/uom");
  }

  handleEdit() {
    const selectedUomId = this.state.selectedUomId;
    if (selectedUomId) {
      this.setState({ selectedUomId: undefined });
      this.props.history.push(`/settings/uom/${selectedUomId}`);
    }
  }

  handleDelete() {
    const selectedUomId = this.state.selectedUomId;

    if (selectedUomId) {
      this.setState({ selectedUomId: undefined });
      this.props.action.deleteUomAction(selectedUomId).catch(error => {
        toastr.error(error);
      });
    }
  }

  handleRowSelect(row, isSelected) {
    if (isSelected) {
      this.setState({ selectedUomId: row.id });
    }
  }

  render() {
    const { uoms } = this.props;

    if (!uoms) return <div>Loading...</div>;
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card mt-3">
            <div className="card-header">
              <h3 className="card-title">Đơn vị tính</h3>
            </div>
            <div className="card-footer clearfix">
              <ListButton
                handleAdd={this.handleAdd}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
              />
            </div>
            <div className="card-body p-0">
              <UomList uoms={uoms} handleRowSelect={this.handleRowSelect} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uoms: state.uomsReducer.uoms
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(uomAction, dispatch)
});

UomListContainer.propTypes = {
  uoms: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UomListContainer);
