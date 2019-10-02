import React from "react";
import * as PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import dateFormat from "../common/MyFormat";

function titleFormatter(cell, row) {
  return `<a href="/mrp/production/${row.id}/detail" > ${cell} </a>`;
}

function contactFormatter(cell) {
  if (!cell) return;
  return cell.code + cell.name;
}

function orderLineFormatter(cell) {
  if (!cell) return;
  return cell.spec;
}

class ProductionList extends React.Component {
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
            data={this.props.productions}
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

            <TableHeaderColumn dataField="name" dataFormat={titleFormatter}>
              Tên
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="OrderLine"
              dataFormat={orderLineFormatter}
            >
              Sản phẩm
            </TableHeaderColumn>

            <TableHeaderColumn dataField="productDimension">
              Kích thước
            </TableHeaderColumn>
            <TableHeaderColumn dataField="productQty">
              Số lượng SX
            </TableHeaderColumn>
            <TableHeaderColumn dataField="productUom">ĐVT</TableHeaderColumn>
            <TableHeaderColumn dataField="state">Trạng thái</TableHeaderColumn>

            <TableHeaderColumn dataField="createdAt" dataFormat={dateFormat}>
              Ngày tạo
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}

ProductionList.propTypes = {
  productions: PropTypes.array.isRequired,
  handleRowSelect: PropTypes.func.isRequired
};

export default ProductionList;
