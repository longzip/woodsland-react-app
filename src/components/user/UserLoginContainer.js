import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as userAction from "../../action/UserAction";
import LoginForm from "./LoginForm";

const refresh = () => {
  window.location.replace("/");
  // window.location.reload(false);
};

export class UserLoginContainer extends Component {
  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(values) {
    const user = {
      username: values.username,
      password: values.password
    };
    this.props.action
      .loginUserAction(user)
      .then(() => {
        toastr.success("Login Success");
        refresh();
        // this.props.history.replace("/");
      })
      .catch(error => {
        toastr.error(error);
      });
  }
  render() {
    return (
      <div className="login-box">
        <div className="login-logo">
          <Link to="/">
            <b>WOODSLAND</b> APP
          </Link>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>

            <div className="social-auth-links text-center mb-3">
              <LoginForm
                handleLogin={this.handleLogin}
                initialValues={{ username: "admin", password: "123456" }}
              />
              <p>- OR -</p>
              <Link to="#" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
              </Link>
              <Link to="#" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2"></i> Sign in using
                Google+
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(userAction, dispatch)
});

UserLoginContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLoginContainer);
