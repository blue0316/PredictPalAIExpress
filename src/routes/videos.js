const express = require("express");
const router = express.Router();
const videosController = require("../controllers/videos/videos.controller");

// Route for creating a video
router.post("/", videosController.createVideo);

// Route for getting all videos
router.get("/", videosController.getAllVideos);

// Route for getting single user's videos
router.get("/user/:user_id", videosController.getSingleUserVideos);

// Route for getting a video by ID
router.get("/single/:video_id", videosController.getVideoById);

// Route for updating a video by Video URL
router.put("/url", videosController.updateVideoByUrl);

// Route for updating a video by ID
router.put("/:video_id", videosController.updateVideo);

// Route for deleting a video by ID
router.delete("/:video_id", videosController.deleteVideo);

module.exports = router;
