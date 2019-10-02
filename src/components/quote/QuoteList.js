import React from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import dateFormat from "../common/MyFormat";

const titleFormatter = (cell, row) => {
  return `<a href=/sales/quote/${row.id}/detail>${cell}</a>`;
};
// const contactFormatter = cell => {
//   return cell.name + "-" + cell.description;
// };
const userFormatter = cell => {
  return cell.name;
};

class QuoteList extends React.Component {
  constructor(props) {
    super(props);

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
        data={this.props.quotes}
        selectRow={this.selectRowProp}
        version="4"
        bordered={false}
        striped
        hover
        search
      >
        <TableHeaderColumn dataField="id" isKey hidden>
          Id
        </TableHeaderColumn>

        <TableHeaderColumn
          width="120"
          dataField="description"
          dataFormat={titleFormatter}
        >
          Gói thầu
        </TableHeaderColumn>

        {/* <TableHeaderColumn
          width="80"
          dataField="Contact"
          dataFormat={contactFormatter}
        >
          Dự án
        </TableHeaderColumn> */}

        <TableHeaderColumn width="50" dataField="version" dataAlign="center">
          Lần
        </TableHeaderColumn>

        <TableHeaderColumn width="80" dataField="stage">
          Tình trạng
        </TableHeaderColumn>

        <TableHeaderColumn
          width="90"
          dataFormat={userFormatter}
          dataField="User"
        >
          Tạo bởi
        </TableHeaderColumn>

        <TableHeaderColumn
          width="120"
          dataFormat={dateFormat}
          dataField="createdAt"
        >
          Ngày
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

QuoteList.propTypes = {
  quotes: PropTypes.array.isRequired,
  handleRowSelect: PropTypes.func.isRequired
};

export default QuoteList;
