import React, { Component, Fragment } from "react";
import { Container } from "reactstrap";
import { logout } from "../../actions/authActions";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
import propTypes from "prop-types";

export class Cart extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Fragment>
        <NavLink className="CartBtn" href="/mycart">
          <img src="https://img.icons8.com/windows/32/000000/shopping-cart.png" />
        </NavLink>
      </Fragment>
    );
  }
}

export default connect(null)(Cart);
  