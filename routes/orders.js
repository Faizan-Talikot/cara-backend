const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Order  = require("../models/Order");
const { body, validationResult } = require("express-validator");

// ROUTE 1:Get all the orders using get : "api/notes/fetchallorders". login required
router.get("/fetchallorders", fetchuser, async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user.id });
      res.json(orders);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  });

// ROUTE 2:Add a new order using Post : "api/orders/addorder". login required
router.post("/addorder",fetchuser,async (req, res) => {
    try {
      const { name, street, city, state, pincode, landmark, address,total, cartItems } = req.body;
      // if there are errors, return Bad request and the errors
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
      }
      const order = new Order({
        name,
        street,
        city,
        state,
        pincode,
        landmark,
        address,
        total,
        cartItems,
        user: req.user.id,
      });
      const savedOrder = await order.save();
      res.json(savedOrder);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 4:Delete an existing order using Delete : "api/notes/deletenote". login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
      //Find the note to be deleted and delete it
      let order = await Order.findById(req.params.id);
      //if note doesn't exists
      if (!order) {
        return res.status(404).send("Not Found");
      }
  
      // checking ki user apni hi note delete kar raha hai
      if (order.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
  
      order = await Order.findByIdAndDelete(req.params.id);
      res.json({ Success: "Order has been deleted", order: order });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
    
  });

module.exports = router;