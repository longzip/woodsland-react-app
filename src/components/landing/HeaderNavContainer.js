import React from "react";
import { Link } from "react-router-dom";

class HeaderNavContainer extends React.Component {
  render() {
    return (
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" data-widget="pushmenu" to="#">
              <i className="fas fa-bars"></i>
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/datas/products" className="nav-link">
              Products
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/courses" className="nav-link">
              Courses
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default HeaderNavContainer;
