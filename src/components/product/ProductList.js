import React from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import dateFormat from "../common/MyFormat";

class ProductList extends React.Component {
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
        data={this.props.products}
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

        <TableHeaderColumn dataField="code">Mã SP</TableHeaderColumn>

        <TableHeaderColumn dataField="name">Tên sản phẩm</TableHeaderColumn>
        <TableHeaderColumn dataField="type">Loại</TableHeaderColumn>
        <TableHeaderColumn dataField="ProductCategory">
          Danh mục
        </TableHeaderColumn>

        <TableHeaderColumn dataField="listPrice">Giá</TableHeaderColumn>

        <TableHeaderColumn dataField="uom">ĐVT</TableHeaderColumn>

        <TableHeaderColumn dataField="createdAt" dataFormat={dateFormat}>
          Ngày tạo
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  handleRowSelect: PropTypes.func.isRequired
};

export default ProductList;
