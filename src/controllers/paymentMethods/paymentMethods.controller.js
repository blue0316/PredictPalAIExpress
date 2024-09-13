const { Op } = require("sequelize");
const { successResponse, errorResponse } = require("../../helpers");
const { PaymentMethods, UserProfiles } = require("../../models");
const {
  createPaymentMethodSchema,
  updatePaymentMethodSchema,
} = require("./paymentMethods.validator");

// Create a new PaymentMethod
exports.createPaymentMethod = async (req, res) => {
  try {
    const { error } = createPaymentMethodSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const paymentMethod = await PaymentMethods.create(req.body);
    return successResponse(req, res, paymentMethod, 201);
  } catch (err) {
    return errorResponse(req, res, "Error creating payment method", 500, err);
  }
};

// Get all PaymentMethods
exports.getAllPaymentMethods = async (req, res) => {
  try {
    const { keyword = "", page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const condition = keyword
      ? {
          [Op.or]: [
            { Type: { [Op.like]: `%${keyword}%` } },
            { Number: { [Op.like]: `%${keyword}%` } },
          ],
        }
      : null;

    const paymentMethods = await PaymentMethods.findAndCountAll({
      where: condition,
      limit: limit,
      offset: offset,
      distinct: true,
      include: [{ model: UserProfiles, as: "UserProfiles" }],
      order: [["LastUsed", "DESC"]],
    });

    return successResponse(
      req,
      res,
      {
        totalItems: paymentMethods.count,
        data: paymentMethods.rows,
        totalPages: Math.ceil(paymentMethods.count / limit),
        currentPage: page ? +page : 1,
      },
      200
    );
  } catch (err) {
    return errorResponse(req, res, "Error fetching payment methods", 500, err);
  }
};

// Get a PaymentMethod by ID
exports.getPaymentMethodById = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethods.findByPk(req.params.id, {
      include: [{ model: UserProfiles, as: "UserProfiles" }],
    });
    if (!paymentMethod) {
      return res.status(404).json({ message: "Payment method not found" });
    }
    return successResponse(req, res, paymentMethod, 200);
  } catch (err) {
    return errorResponse(req, res, "Error fetching payment method", 500, err);
  }
};

// Update a PaymentMethod
exports.updatePaymentMethod = async (req, res) => {
  try {
    const { error } = updatePaymentMethodSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const paymentMethod = await PaymentMethods.findByPk(req.params.id);
    if (!paymentMethod) {
      return res.status(404).json({ message: "Payment method not found" });
    }

    await paymentMethod.update(req.body);
    return successResponse(req, res, paymentMethod, 200);
  } catch (err) {
    return errorResponse(req, res, "Error updating payment method", 500, err);
  }
};

// Delete a PaymentMethod
exports.deletePaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethods.findByPk(req.params.id);
    if (!paymentMethod) {
      return res.status(404).json({ message: "Payment method not found" });
    }

    await paymentMethod.destroy();
    return successResponse(
      req,
      res,
      "Payment method deleted successfully",
      200
    );
  } catch (err) {
    return errorResponse(req, res, "Error deleting payment method", 500, err);
  }
};
