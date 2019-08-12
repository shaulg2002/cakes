const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");
mongoose.set("debug", true);

//Item model
const Item = require("../../models/Item");
const User = require("../../models/User");

// @route    GET api/cart
// @desc     Get ALL cart items
// @access   Private
router.get("/", auth, (req, res) => {
  const userId = req.user.id;
  User.findById(userId).then(user => res.json(user.cart));
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
        User.findById(userId)
          .then(() => {
            User.findOneAndUpdate(
              { _id: userId },
              { $push: { cart: item.id } },
              { upsert: true },
              function(err, data) {
                if (err) {
                  return res.status(500).send(err);
                }
                if (!data) {
                  return res.status(404).end();
                }
                return res
                  .status(200)
                  .send(item);
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
  Item.findById(req.params.id)
    .then(item => {
      User.findById(req.user.id).then(user => {
        User.findOneAndUpdate(
          { _id: req.user.id },
          { $pull: { cart: item.id } },
          function(err, data) {
            if (err) {
              return res.status(500).send(err);
            }
            if (!data) {
              return res.status(404).end();
            }
            return res
              .status(200)
              .send({ msg: `Success` });
          }
        );
      });
    })

    .catch(err => res.status(404).json({ success: false }));
});

//     Item.findById(req.params.id)
//         .then(item => item.remove().then(() => res.json({ success: true })))
//         .catch(err => res.status(404).json({ success: false }));
// });

module.exports = router;
