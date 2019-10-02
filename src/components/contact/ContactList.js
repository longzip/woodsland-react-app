import React from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import dateFormat from "../common/MyFormat";
const titleFormatter = (cell, row) => {
  return `<a href=/sales/contact/${row.id}/detail>${cell}</a>`;
};

class ContactList extends React.Component {
  constructor(props) {
    super(props);

    this.options = {
      sortIndicator: true,
      noDataText: "No data"
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
        data={this.props.contacts}
        pagination={true}
        selectRow={this.selectRowProp}
        options={this.options}
        version="4"
        bordered={false}
        striped
        hover
        condensed
        search
      >
        <TableHeaderColumn dataField="id" isKey hidden>
          Id
        </TableHeaderColumn>

        <TableHeaderColumn
          width="80"
          dataField="name"
          dataFormat={titleFormatter}
        >
          Mã dự án
        </TableHeaderColumn>

        <TableHeaderColumn width="210" dataField="description">
          Tên chủ đầu tư
        </TableHeaderColumn>

        <TableHeaderColumn width="90" dataField="phone" dataAlign="center">
          Phone
        </TableHeaderColumn>

        <TableHeaderColumn width="220" dataField="email">
          Email
        </TableHeaderColumn>

        <TableHeaderColumn width="220" dataField="addressLine">
          Địa chỉ
        </TableHeaderColumn>

        <TableHeaderColumn width="110" dataField="city">
          Tỉnh thành
        </TableHeaderColumn>
        <TableHeaderColumn dataField="createdAt" dataFormat={dateFormat}>
          Ngày tạo
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  handleRowSelect: PropTypes.func.isRequired
};

export default ContactList;
