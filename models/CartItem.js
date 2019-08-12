const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Item = require("./Item").schema;

const CartItemSchema = Schema({
  item: { 
      type: Item
 },
  quantity: {
      type: Number,
      default: 0
  }

});

module.exports = CartItem = mongoose.model("cartItem", CartItemSchema);
