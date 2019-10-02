import React, { Component } from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

const titleFormatter = (cell, row) => {
  return `<a href=/datas/routing/${row.id}/detail target="_blank">${cell}</a>`;
};

class RoutingList extends React.Component {
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
        data={this.props.routings}
        pagination={true}
        selectRow={this.selectRowProp}
        options={this.options}
        bordered={false}
        striped
        hover
        condensed
      >
        <TableHeaderColumn dataField="id" isKey hidden>
          #
        </TableHeaderColumn>

        <TableHeaderColumn dataField="code" dataFormat={titleFormatter}>
          Mã
        </TableHeaderColumn>

        <TableHeaderColumn dataField="name">Tên</TableHeaderColumn>
        <TableHeaderColumn dataField="note">Ghi chú</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

RoutingList.propTypes = {
  routings: PropTypes.array.isRequired,
  handleRowSelect: PropTypes.func.isRequired
};

export default RoutingList;
