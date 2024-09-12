const express = require("express");

const userProfilesRoute = require("./userProfiles");

const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.use("/user-profiles", userProfilesRoute);

module.exports = router;
