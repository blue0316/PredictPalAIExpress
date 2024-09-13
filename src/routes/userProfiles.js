const express = require("express");
const userProfilesController = require("../controllers/userProfiles/userProfiles.controller");

const router = express.Router();

// Create a new user profile
router.post("/", userProfilesController.createUserProfile);

// Get all user profiles
router.get("/", userProfilesController.getAllUserProfiles);

// Get user profile by UID
router.get("/:uid", userProfilesController.getUserProfileByUid);

// Update user profile by UID
router.put("/:uid", userProfilesController.updateUserProfile);

// Delete user profile by UID
router.delete("/:uid", userProfilesController.deleteUserProfile);

module.exports = router;
