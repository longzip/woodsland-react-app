import React from "react";
import * as PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import dateFormat from "../common/MyFormat";

export class UserList extends React.Component {
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
      <div>
        <div className="card mt-2">
          <BootstrapTable
            data={this.props.users}
            selectRow={this.selectRowProp}
            version="4"
            bordered={false}
            striped
            hover
            condensed
            pagination
            search
          >
            <TableHeaderColumn dataField="id" isKey hidden>
              #
            </TableHeaderColumn>

            <TableHeaderColumn dataField="name">Tên</TableHeaderColumn>

            <TableHeaderColumn dataField="username" dataAlign="center">
              Username
            </TableHeaderColumn>

            <TableHeaderColumn dataField="email">Email</TableHeaderColumn>

            <TableHeaderColumn dataField="createdAt" dataFormat={dateFormat}>
              Ngày tạo
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  handleRowSelect: PropTypes.func.isRequired
};

export default UserList;
