const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");
mongoose.set("debug", true);

//Item and User models
const Item = require("../../models/Item");
const User = require("../../models/User");
const CartItem = require("../../models/CartItem").schema;

// @route    GET api/cart
// @desc     Get ALL cart items
// @access   Private
router.get("/", auth, (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  User.findById(userId)
    .then(user => res.json(user.cart))
    .catch(err => res.status(400).json({ success: "false" }));
});

// @route    POST api/cart/:id
// @desc     Add item to cart
// @access   Private

//NEED TO CHANGE IF STATEMENT
router.post("/:id", auth, (req, res) => {
  const userId = req.user.id;
  Item.findById(req.params.id)
    .then(item => {
      if (item) {
        const cartItem = {
          item
        };
        User.findById(userId)
          .then(() => {
            User.findOneAndUpdate(
              { _id: userId },
              { $push: { cart: cartItem } },
              { upsert: true },
              function(err, data) {
                if (err) {
                  return res.status(500).send(err);
                }
                if (!data) {
                  return res.status(404).end();
                }
                return res.status(200).send(cartItem.item);
              }
            );
          })
          .catch(err => res.status(400).json({ msg: "Unauthorized" }));
      } else return res.status(404).json({ msg: "Item not found!!!" });
    })
    .catch(err => res.status(404).json({ msg: "Item not found" }));
});

// @route    DELETE api/cart/:id
// @desc     DELETE an item
// @access   Private
router.delete("/:id", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user.id },
    { $pull: { cart: { _id: req.params.id } } },
    function(err, data) {
      if (err) {
        return res.status(500).send(err);
      }
      if (!data) {
        return res.status(404).end();
      }
      return res.status(200).send(data);
    }
  ).catch(err => res.status(404).json({ success: false }));
});

//     Item.findById(req.params.id)
//         .then(item => item.remove().then(() => res.json({ success: true })))
//         .catch(err => res.status(404).json({ success: false }));
// });

module.exports = router;
