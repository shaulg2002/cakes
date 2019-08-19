import React, { Component } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { connect } from "react-redux";
import { getCartItems, deleteItemFromCart } from "../../actions/cartActions";
import { getItems } from "../../actions/itemActions";

export class MyCart extends Component {
  componentDidMount() {
    this.props.getCartItems();
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItemFromCart(id);
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    // const {items} = this.props.items
    let totalSum = 0;
    this.props.cartItems.items.forEach(element => {
      totalSum = totalSum + element.item.price;
    });
    return (
      <div>
        {user ? <h3>Hello {user.name}</h3> : null}

        <ListGroup>
          {this.props.cartItems.items.map(cartItem => (
            <ListGroupItem key={cartItem._id} style={{backgroundColor:"#F9F5F5"}}>
              {cartItem.item.name}
              <div style={{ float: "right" }}>
                {cartItem.item.price}₪
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  float="right"
                  onClick={this.onDeleteClick.bind(this, cartItem._id)}
                >
                  &times;
                </Button>
              </div>
            </ListGroupItem>
          ))}
          <ListGroupItem>
            <strong>Total: </strong>
            <div style={{ float: "right" }}>
              <strong>{totalSum} ₪ </strong>
            </div>
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  cartItems: state.cartItem,
  items: state.Item
});

export default connect(
  mapStateToProps,
  { getCartItems, deleteItemFromCart, getItems }
)(MyCart);
