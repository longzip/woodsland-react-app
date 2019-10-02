import React from "react";
import * as PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import dateFormat from "../common/MyFormat";

const titleFormatter = (cell, row) => {
  return `<a href=/datas/bom/${row.id}/detail>${cell.name}</a>`;
};
const nameFormatter = cell => {
  return cell.name;
};

class BomList extends React.Component {
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
            data={this.props.boms}
            pagination={true}
            selectRow={this.selectRowProp}
            options={this.options}
            striped
            hover
            condensed
            search
          >
            <TableHeaderColumn dataField="id" isKey hidden>
              #
            </TableHeaderColumn>

            <TableHeaderColumn
              width="150"
              dataField="Product"
              dataFormat={titleFormatter}
            >
              Sản phẩm
            </TableHeaderColumn>

            <TableHeaderColumn width="250" dataField="name">
              Biến thể sản phẩm
            </TableHeaderColumn>

            <TableHeaderColumn
              dataAlign="center"
              width="80"
              dataField="productQty"
            >
              Số lượng
            </TableHeaderColumn>

            <TableHeaderColumn
              dataAlign="center"
              width="70"
              dataField="productUom"
            >
              ĐVT
            </TableHeaderColumn>

            <TableHeaderColumn
              width="550"
              dataField="Routing"
              dataFormat={nameFormatter}
            >
              Quy trình sản xuất
            </TableHeaderColumn>

            <TableHeaderColumn
              width="120"
              dataField="createdAt"
              dataFormat={dateFormat}
            >
              Ngày tạo
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}

BomList.propTypes = {
  boms: PropTypes.array.isRequired,
  handleRowSelect: PropTypes.func.isRequired
};

export default BomList;
