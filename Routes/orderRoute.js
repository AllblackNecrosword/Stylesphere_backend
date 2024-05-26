const express = require("express");
const {
  addOrder,
  getOrder,
  updateOrder,
  getSingleOrder,
  cancelOrder,
  ShowcancelOrder,
  Returnorder,
  OrderReturnwithreason,
  fetchReturnOrder,
  deleteOrder
} = require("../controllers/orderController");
const router = express.Router();

router.post("/", addOrder);
router.get("/getorder", getOrder);
router.get("/cancelorder", ShowcancelOrder);
router.get("/returnorder/:orderId", Returnorder);
router.post("/returnform", OrderReturnwithreason);
router.get("/returndata", fetchReturnOrder);
router.patch("/:id", updateOrder);
router.patch("/cancel/:id", cancelOrder);
router.get("/:customer", getSingleOrder);
router.get("returnorder/:orderid", getSingleOrder);
router.delete("/deleteorder/:orderid",deleteOrder)


module.exports = router;
