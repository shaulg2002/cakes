import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import {connect} from 'react-redux';
import { getCartItems, deleteItemFromCart} from '../../actions/cartActions';


export class MyCart extends Component {
    componentDidMount() {
        this.props.getCartItems();
      }
    
      onDeleteClick = id => {
        this.props.deleteItemFromCart(id);
      };
    
    render() {
      const {isAuthenticated,user} = this.props.auth
      const {cartItems} = this.props.cartItem;
    return (
      <div>
          <header>
              <strong>{user ? `Hello ${user.name}` : ""}</strong>
          </header>
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
    cartItem: state.cartItem,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    {getCartItems, deleteItemFromCart}
  )(MyCart);