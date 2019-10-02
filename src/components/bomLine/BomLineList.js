import React from "react";
import * as PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import dateFormat from "../common/MyFormat";
import {
  productFormatter,
  routingFormatter
} from "../common/TableColumnFormat";

const titleFormatter = (cell, row) => {
  return `<a href=/datas/bom/${row.id}/detail>${cell}</a>`;
};

class BomLineList extends React.Component {
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
      <div>
        <div className="card">
          <BootstrapTable
            data={this.props.bomLines}
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

            <TableHeaderColumn
              dataField="Product"
              dataFormat={productFormatter}
            >
              Sản phẩm
            </TableHeaderColumn>

            <TableHeaderColumn dataField="name" dataFormat={titleFormatter}>
              Biến thể sản phẩm
            </TableHeaderColumn>

            <TableHeaderColumn dataField="productQty">
              Số lượng
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="Routing"
              dataFormat={routingFormatter}
            >
              Quy trình sản xuất
            </TableHeaderColumn>

            <TableHeaderColumn dataField="createdAt" dataFormat={dateFormat}>
              Ngày tạo
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}

BomLineList.propTypes = {
  bomLines: PropTypes.array.isRequired,
  handleRowSelect: PropTypes.func.isRequired
};

export default BomLineList;
