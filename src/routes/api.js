const express = require("express");

const userProfilesRoute = require("./userProfiles");
const paymentMethodsRoute = require("./paymentMethods");
const videosRoute = require("./videos");

const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.use("/user-profiles", userProfilesRoute);
router.use("/payment-methods", paymentMethodsRoute);
router.use("/videos", videosRoute);

module.exports = router;
