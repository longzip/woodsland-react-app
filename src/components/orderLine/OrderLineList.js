import React from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
const formatter = new Intl.NumberFormat("vi");
const titleFormatter = (cell, row) => {
  return `<a href=/sales/order-line/${row.id}/detail>${cell}</a>`;
};
const productFormatter = cell => {
  if (cell) return cell.name;
  return;
};

const currencyFormatter = cell => {
  if (cell)
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(cell);
  return;
};

const subtotalLineFormatter = (cell, row) => {
  if (cell) {
    return formatter.format(cell * row.productUomQty);
  }
  return;
};

const numberFormatter = cell => {
  if (cell) return formatter.format(cell);
  return;
};

class OrderLineList extends React.Component {
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
        data={this.props.orderLines}
        selectRow={this.selectRowProp}
        options={this.options}
        version="4"
        bordered={false}
        striped
        hover
        condensed
      >
        <TableHeaderColumn dataField="id" isKey hidden>
          Id
        </TableHeaderColumn>

        <TableHeaderColumn dataField="Product" dataFormat={productFormatter}>
          Tên sản phẩm
        </TableHeaderColumn>

        <TableHeaderColumn dataField="productSpec" dataFormat={titleFormatter}>
          Spec
        </TableHeaderColumn>

        <TableHeaderColumn dataField="productDimension">
          Kích thước
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="productPrice"
          dataFormat={numberFormatter}
        >
          Đơn giá
        </TableHeaderColumn>

        <TableHeaderColumn dataField="productUom">
          Đơn vị tính
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="productUomQty"
          dataFormat={numberFormatter}
        >
          Số lượng
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="productPrice"
          dataFormat={subtotalLineFormatter}
        >
          Thành tiền
        </TableHeaderColumn>

        {/* <TableHeaderColumn dataField="note">Ghi chú</TableHeaderColumn> */}
      </BootstrapTable>
    );
  }
}

OrderLineList.propTypes = {
  orderLines: PropTypes.array.isRequired,
  handleRowSelect: PropTypes.func.isRequired
};

export default OrderLineList;
