import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  //NavLink,
  Container
} from "reactstrap";
import { Link } from "react-router-dom";
import RegisterModal from "../components/auth/RegisterModal";
import Logout from "../components/auth/Logout";
import LoginModal from "./auth/LoginModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Cart from './auth/Cart';

export class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
          <Container className="NavbarRightContainer">
        <NavItem>
          <span className="navbar-text mr-3" color="white">
            <strong>{user ? `Welcome ${user.name}` : ""}</strong>
          </span>
        </NavItem>
        <NavItem>
        <Cart />
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
        </Container>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar
          style={{ backgroundColor: "#ffdbe9", marginBottom: "5%" }}
          expand="sm"
          className="navbar"
        >
          <Container>
            <NavbarBrand
              href="/"
              style={{
                fontFamily: "Barriecito",
                color: "#000",
                fontSize: "200%"
              }}
            >
              Shosh Cakes
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(AppNavbar);
