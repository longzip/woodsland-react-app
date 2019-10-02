import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userAction from "../../action/UserAction";
import { hasRole } from "../../utils/auth";

export class MenuContainer extends React.Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    this.props.action.logoutUserAction();
  }
  render() {
    const { userAuth } = this.props;
    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link to="/" className="brand-link">
          <img
            src="/dist/img/logo.png"
            alt="Woodsland"
            className="brand-image  elevation-3"
            style={{ opacity: ".8" }}
          />

          <span className="brand-text font-weight-light">Woodsland App</span>
        </Link>

        <div className="sidebar">
          {/* <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="/dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User"
              />
            </div>
            <div className="info">
              <Link to="/about" className="d-block">
                {this.props.userAuth.name}
              </Link>
            </div>
          </div> */}

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  to="/dashboard"
                  className="nav-link"
                >
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Overview</p>
                </NavLink>
              </li>

              {/* <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  to="/sales/contacts"
                  className="nav-link"
                >
                  <i className="fab fa-delicious nav-icon" />
                  <p>Dự án</p>
                </NavLink>
              </li> */}

              <li className="nav-item has-treeview">
                <NavLink
                  activeClassName="active"
                  to="/sales"
                  className="nav-link"
                >
                  <i className="nav-icon fab fa-delicious" />
                  <p>
                    Bán hàng
                    <i className="right fas fa-angle-left" />
                  </p>
                </NavLink>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <NavLink
                      activeClassName="active"
                      to="/sales/quotes"
                      className="nav-link"
                    >
                      <i className="fa fa-cart-arrow-down nav-icon" />
                      <p>Báo giá</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      activeClassName="active"
                      to="/sales/orders"
                      className="nav-link"
                    >
                      <i className="fas fa-check-circle nav-icon" />
                      <p>Đơn hàng</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      activeClassName="active"
                      to="/sales/contacts"
                      className="nav-link"
                    >
                      <i className="far fa-address-book nav-icon" />
                      <p>Khách hàng</p>
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="nav-item has-treeview">
                <NavLink
                  activeClassName="active"
                  to="/mrp"
                  className="nav-link"
                >
                  <i className="nav-icon fab fa-buromobelexperte" />
                  <p>
                    Sản xuất
                    <i className="right fas fa-angle-left" />
                  </p>
                </NavLink>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <NavLink
                      activeClassName="active"
                      to="/mrp/productions"
                      className="nav-link"
                    >
                      <i className="far fa-calendar-plus nav-icon"></i>
                      <p>Lệnh sản xuất</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      activeClassName="active"
                      to="/mrp/workorders"
                      className="nav-link"
                    >
                      <i className="far fa-calendar-plus nav-icon"></i>
                      <p>Lệnh làm việc</p>
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="nav-item has-treeview">
                <NavLink
                  activeClassName="active"
                  to="/datas"
                  className="nav-link"
                >
                  <i className="nav-icon far fa-building" />
                  <p>
                    Dữ liệu sản xuất
                    <i className="right fas fa-angle-left" />
                  </p>
                </NavLink>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <NavLink
                      activeClassName="active"
                      to="/datas/routings"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Quy trình sản xuất</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      activeClassName="active"
                      to="/datas/boms"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Định mức nguyên liệu</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      activeClassName="active"
                      to="/datas/products"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Sản phẩm</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      activeClassName="active"
                      to="/datas/workcenters"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Công đoạn sản xuất</p>
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* <li className="nav-item has-treeview">
                <NavLink
                  activeClassName="active"
                  to="/reporting"
                  className="nav-link"
                >
                  <i className="nav-icon fas fa-calculator" />
                  <p>
                    Báo cáo
                    <i className="right fas fa-angle-left" />
                  </p>
                </NavLink>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <NavLink
                      activeClassName="active"
                      to="/reporting/productions"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Đặt hàng sản xuất</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      activeClassName="active"
                      to="/reporting/workorders"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Lệnh sản xuất</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      activeClassName="active"
                      to="/reporting/oscp"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Năng lực sản xuất</p>
                    </NavLink>
                  </li>
                </ul>
              </li> */}
              <li className="nav-item has-treeview">
                <NavLink
                  activeClassName="active"
                  to="/stocks"
                  className="nav-link"
                >
                  <i className="nav-icon fas fa-clipboard-list" />
                  <p>
                    Quản lý kho
                    <i className="right fas fa-angle-left" />
                  </p>
                </NavLink>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <NavLink
                      activeClassName="active"
                      to="/stocks/productions"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Kho thành phẩm</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      activeClassName="active"
                      to="/stocks/workorders"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Giao hàng</p>
                    </NavLink>
                  </li>
                </ul>
              </li>
              {hasRole(userAuth, ["admin"]) && (
                <li className="nav-item has-treeview">
                  <NavLink
                    activeClassName="active"
                    to="/settings"
                    className="nav-link"
                  >
                    <i className="nav-icon fa fa-cogs" />
                    <p>
                      Cài đặt
                      <i className="right fas fa-angle-left" />
                    </p>
                  </NavLink>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <NavLink
                        activeClassName="active"
                        to="/settings/uoms"
                        className="nav-link"
                      >
                        <i className="fa fa-users nav-icon" />
                        <p>Đơn vị</p>
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink
                        activeClassName="active"
                        to="/settings/users"
                        className="nav-link"
                      >
                        <i className="fa fa-users nav-icon" />
                        <p>Users</p>
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  to="#"
                  className="nav-link"
                  onClick={this.handleLogout}
                >
                  <i className="nav-icon 	fa fa-power-off" />
                  <p>Thoát</p>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    );
  }
}

const mapStateToProps = state => ({
  userAuth: state.loginedUserReducer.userAuth
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(userAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuContainer);
