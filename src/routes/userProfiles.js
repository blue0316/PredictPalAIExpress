const express = require("express");
const userProfileController = require("../controllers/userProfiles/userProfiles.controller");

const router = express.Router();

// Create a new user profile
router.post("/", userProfileController.createUserProfile);

// Get all user profiles
router.get("/", userProfileController.getAllUserProfiles);

// Get user profile by UID
router.get("/:uid", userProfileController.getUserProfileByUid);

// Update user profile by UID
router.put("/:uid", userProfileController.updateUserProfile);

// Delete user profile by UID
router.delete("/:uid", userProfileController.deleteUserProfile);

module.exports = router;
