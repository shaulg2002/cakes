import React, { Component, Fragment } from 'react';
import {Container} from 'reactstrap';
import {logout} from '../../actions/authActions';
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';
import propTypes from 'prop-types';


export class Logout extends Component {
    static propTypes = {
        logout: propTypes.func.isRequired
    }
    
    render() {
        return (
            <Fragment>
                <NavLink className="AuthBtn" onClick={this.props.logout} href="/">
                    <Container className="ImgContainer">
                    <img src="https://img.icons8.com/material/24/000000/imac-exit.png" />                </Container>
                </NavLink>
            </Fragment>
        )
    }
}

export default connect(null, { logout })(Logout);
