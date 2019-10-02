import React from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import getCaret from "../common/GetCaret";

class OrderList extends React.Component {
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
        data={this.props.orders}
        selectRow={this.selectRowProp}
        options={this.options}
        bordered={false}
        striped
        hover
        condensed
      >
        <TableHeaderColumn dataField="id" isKey hidden>
          Id
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="code"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Code
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="name"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Name
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="categoryId"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Category
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="createdAt"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          createdAt
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

OrderList.propTypes = {
  orders: PropTypes.array.isRequired,
  handleRowSelect: PropTypes.func.isRequired
};

export default OrderList;
