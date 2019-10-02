import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as bomAction from "../../action/BomAction";
import BomList from "./BomList";
import ListButton from "../common/ListButton";

export class BomListContainer extends React.Component {
  constructor() {
    super();

    this.state = { selectedBomId: undefined };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  componentDidMount() {
    this.props.action.getBomsAction().catch(error => {
      toastr.error(error);
    });
  }

  handleAdd() {
    this.props.history.push("/datas/bom");
  }

  handleEdit() {
    const selectedBomId = this.state.selectedBomId;
    if (selectedBomId) {
      this.setState({ selectedBomId: undefined });
      this.props.history.push(`/datas/bom/${selectedBomId}`);
    }
  }

  handleDelete() {
    const selectedBomId = this.state.selectedBomId;

    if (selectedBomId) {
      this.setState({ selectedBomId: undefined });
      this.props.action.deleteBomAction(selectedBomId).catch(error => {
        toastr.error(error);
      });
    }
  }

  handleRowSelect(row, isSelected) {
    if (isSelected) {
      this.setState({ selectedBomId: row.id });
    }
  }

  render() {
    const { boms } = this.props;

    if (!boms) {
      return <div>Loading...</div>;
    }

    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card mt-3">
            <div className="card-header">
              <h3 className="card-title">Định mức nguyên vật liệu</h3>
            </div>
            <div className="card-footer clearfix">
              <ListButton
                handleAdd={this.handleAdd}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
              />
            </div>
            <div className="card-body p-0">
              <BomList boms={boms} handleRowSelect={this.handleRowSelect} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  boms: state.bomsReducer.boms
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(bomAction, dispatch)
});

BomListContainer.propTypes = {
  boms: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BomListContainer);
