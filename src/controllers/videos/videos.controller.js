const { Op } = require("sequelize");
const { successResponse, errorResponse } = require("../../helpers");
const { Videos, UserProfiles } = require("../../models");

// Create a new Video
exports.createVideo = async (req, res) => {
  try {
    const video = await Videos.create(req.body);
    return successResponse(req, res, video, 201);
  } catch (err) {
    console.log(err);
    return errorResponse(req, res, "Error creating video", 500, err);
  }
};

// Get all Videos
exports.getAllVideos = async (req, res) => {
  try {
    const { keyword = "", page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const condition = keyword
      ? {
          [Op.or]: [{ Name: { [Op.like]: `%${keyword}%` } }],
        }
      : null;

    const videos = await Videos.findAndCountAll({
      where: condition,
      limit: limit,
      offset: offset,
      distinct: true,
      order: [["Name", "ASC"]],
      include: [
        {
          model: UserProfiles,
          as: "author",
        },
      ],
    });

    return successResponse(
      req,
      res,
      {
        totalItems: videos.count,
        data: videos.rows,
        totalPages: Math.ceil(videos.count / limit),
        currentPage: +page,
      },
      200
    );
  } catch (err) {
    return errorResponse(req, res, "Error fetching videos", 500, err);
  }
};

// Get videos for a single user by user ID
exports.getSingleUserVideos = async (req, res) => {
  const userId = req.params.user_id;
  // Fetch videos from the database where the user ID matches
  Videos.findAll({ userId: userId })
    .then((videos) => {
      res.status(200).json(videos);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving videos", error });
    });
};

// Get a Video by ID
exports.getVideoById = async (req, res) => {
  try {
    const video = await Videos.findByPk(req.params.video_id, {
      include: [
        {
          model: UserProfiles,
          as: "UserProfiles",
        },
      ],
    });
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    return successResponse(req, res, video, 200);
  } catch (err) {
    return errorResponse(req, res, "Error fetching video", 500, err);
  }
};

// Update a Video
exports.updateVideo = async (req, res) => {
  try {
    const video = await Videos.findByPk(req.params.video_id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    await video.update(req.body);
    return successResponse(req, res, video, 200);
  } catch (err) {
    return errorResponse(req, res, "Error updating video", 500, err);
  }
};

// Update a Video
exports.updateVideoByUrl = async (req, res) => {
  try {
    console.log(req.query, req.body);
    const { video_url } = req.query;
    const video = await Videos.findOne({
      where: { VideoUrl: video_url },
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    await video.update(req.body);
    return successResponse(req, res, video, 200);
  } catch (err) {
    return errorResponse(req, res, "Error updating video", 500, err);
  }
};

// Delete a Video
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Videos.findByPk(req.params.video_id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    await video.destroy();
    return successResponse(req, res, "Video deleted successfully", 200);
  } catch (err) {
    return errorResponse(req, res, "Error deleting video", 500, err);
  }
};
