const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Item = require("./Item").schema;

const CartItemSchema = Schema({
  item: { 
      type: Item
 }
});

module.exports = CartItem = mongoose.model("cartItem", CartItemSchema);
