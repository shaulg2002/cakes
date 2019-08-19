import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import { addItemToCart } from '../actions/cartActions'
import PropTypes from "prop-types";

class CakeList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  onAddToCartClick = id => {
    this.props.addItemToCart(id);
    alert('Item was added to your cart!')
  }

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <Row>
          {items.map(({ _id, name, price }) => (
            //Added key because of a warning
            <Col xs="4" key={_id}> 
              <Card style={{ margin: "10px" }}>
                <CardImg 
                  top
                  src="https://blog.williams-sonoma.com/wp-content/uploads/2018/04/apr-26-Neapolitan-Ice-Cream-Cake.jpg"
                  alt="Card image cap"
                />
                <CardBody>
                  <CardTitle>{name}</CardTitle>
                  <CardText>{price} ₪</CardText>
                  <Button className="AddToCartBtn" onClick={this.onAddToCartClick.bind(this,_id)}>Add to cart</Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

CakeList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem, addItemToCart}
)(CakeList);
