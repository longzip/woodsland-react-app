import React from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

class RoutingWorkcenterList extends React.Component {
  constructor(props) {
    super(props);

    this.options = {
      sortIndicator: true,
      noDataText: "Không có dữ liệu"
    };

    this.selectRowProp = {
      mode: "radio",
      bgColor: "#c1f291",
      onSelect: props.handleRowSelect,
      clickToSelect: true,
      hideSelectColumn: true
    };
  }

  render() {
    return (
      <BootstrapTable
        data={this.props.routingWorkcenters}
        selectRow={this.selectRowProp}
        options={this.options}
        bordered={false}
        version="4"
        striped
        hover
        condensed
      >
        <TableHeaderColumn dataField="id" isKey hidden>
          Id
        </TableHeaderColumn>
        <TableHeaderColumn width="80" dataField="sequence">
          Thứ tự
        </TableHeaderColumn>
        <TableHeaderColumn width="160" dataField="name">
          Name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="note">Ghi chú</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

RoutingWorkcenterList.propTypes = {
  routingWorkcenters: PropTypes.array.isRequired,
  handleRowSelect: PropTypes.func.isRequired
};

export default RoutingWorkcenterList;
