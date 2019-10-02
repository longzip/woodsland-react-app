import React from "react";
import * as PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import getCaret from "../common/GetCaret";
import dateFormat from "../common/MyFormat";

class WorkcenterList extends React.Component {


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
          data={this.props.workcenters}
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
            dataField="name"
            dataSort={true}
            caretRender={getCaret}
            columnTitle
          >
            Tên
          </TableHeaderColumn>

          <TableHeaderColumn
            dataField="createdAt"
            dataFormat={dateFormat} 
            dataSort={true}
            caretRender={getCaret}
            columnTitle
          >
            Ngày tạo
          </TableHeaderColumn>
        </BootstrapTable>
        </div>
      </div>
    );
  }
}

WorkcenterList.propTypes = {
  workcenters: PropTypes.array.isRequired,
  handleRowSelect: PropTypes.func.isRequired
};

export default WorkcenterList;
