const { Order } = require("../Models/orderModel");
// const {ReturnOrder} =require("../Models/returnOrderModel");
const ReturnOrder = require("../Models/returnOrderModel");

const addOrder = async (req, res) => {
  const {
    customer,
    shippingAddress,
    totalPrice,
    paymentMethod,
    status,
    products,
  } = req.body;

  try {
    // Check for required fields in shippingAddress
    const { name, email, address, city, state, postalCode } = shippingAddress;
    if (!name || !email || !address || !city || !state || !postalCode) {
      return res.status(400).json({
        message: "Please fill all the required fields in shippingAddress",
      });
    }

    // Create the order
    const order = await Order.create({
      customer,
      shippingAddress,
      totalPrice,
      paymentMethod,
      status,
      products,
      cancellationStatus: "false",
    });

    // Send success response
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    // Send error response
    res.status(500).json({ error: error.message });
  }
};

const getOrder = async (req, res) => {
  try {
    // Find orders with cancellationStatus as false
    const orders = await Order.find({ cancellationStatus: false }).sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  const productId = req.params.id;
  const { status } = req.body;
  console.log(productId, status);
  try {
    const order = await Order.findById(productId);
    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update order" });
  }
};

const getSingleOrder = async (req, res) => {
  const customerId = req.params.customer;
  try {
    // const order = await Order.findOne({customer});
    const order = await Order.find({ customer: customerId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const cancelOrder = async (req, res) => {
  const orderID = req.params.id;
  console.log(orderID);
  try {
    await Order.createIndexes({ orderId: 1 });
    const order = await Order.findById(orderID).lean();
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({
        message: "Product cannot be cancelled as it's not in 'Pending' status",
      });
    }
    await Order.updateOne(
      { _id: orderID },
      { $set: { cancellationStatus: "Canceled" } }
    );
    return res.status(200).json({ message: "Order canceled successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const ShowcancelOrder = async (req, res) => {
  try {
    const order = await Order.find({ cancellationStatus: "Canceled"});
    // const order = await Order.find({
    //   $and: [{ cancellationStatus: "Canceled" }, { status: "Cancelled" }],
    // });
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const Returnorder = async (req, res) => {
  const orderID = req.params.orderId;
  console.log(orderID);
  try {
    const order = await Order.findById(orderID);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
  }
};

const OrderReturnwithreason = async (req, res) => {
  try {
    const { orderId, comment, reason, isDefective } = req.body;
    const order = await ReturnOrder.create({
      orderId,
      isDefective,
      comment,
      reason,
    });
    // Send success response
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
  }
  // res.status(200).json({message:"I am working"})
};

const fetchReturnOrder = async (req, res) => {
  try {
    const order = await ReturnOrder.find();
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
  }
};

const deleteOrder = async (req, res) => {
  const orderId = req.params.orderid;
  try {
    const order = await Order.findByIdAndDelete(orderId);
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addOrder,
  getOrder,
  updateOrder,
  getSingleOrder,
  cancelOrder,
  ShowcancelOrder,
  Returnorder,
  OrderReturnwithreason,
  fetchReturnOrder,
  deleteOrder,
};
