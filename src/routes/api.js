const express = require("express");

const userProfilesRoute = require("./userProfiles");
const paymentMethodsRoute = require("./paymentMethods");

const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.use("/user-profiles", userProfilesRoute);
router.use("/payment-methods", paymentMethodsRoute);

module.exports = router;
