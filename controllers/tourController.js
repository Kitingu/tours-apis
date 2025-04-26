const { Tour } = require('../models');

exports.getAllTours = async (req, res, next) => {
  try {
    const tours = await Tour.findAll();
    res.json(tours);
  } catch (error) {
    next(error);
  }
};

exports.getTourById = async (req, res, next) => {
  try {
    const tour = await Tour.findByPk(req.params.id);
    if (tour) {
      res.json(tour);
    } else {
      const error = new Error('Tour not found');
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

exports.createTour = async (req, res, next) => {
  try {
    const { name, destination_id, duration_days, price, feature_image_url } = req.body;

    if (!name || !destination_id || duration_days === undefined || price === undefined || !feature_image_url) {
      const error = new Error('Name, destination ID, duration days, price, and feature image URL are required.');
      error.statusCode = 400;
      throw error;
    }

    if (isNaN(duration_days) || isNaN(price)) {
      const error = new Error('Duration days and price must be valid numbers.');
      error.statusCode = 400;
      throw error;
    }

    // 🔥 Duplicate check
    const existingTour = await Tour.findOne({ where: { name, destination_id } });
    if (existingTour) {
      const error = new Error('Tour with the same name for this destination already exists.');
      error.statusCode = 409;
      throw error;
    }

    const tour = await Tour.create(req.body);
    res.status(201).json(tour);
  } catch (error) {
    next(error);
  }
};

exports.updateTour = async (req, res, next) => {
  try {
    const tour = await Tour.findByPk(req.params.id);
    if (tour) {
      await tour.update(req.body);
      res.json(tour);
    } else {
      const error = new Error('Tour not found');
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteTour = async (req, res, next) => {
  try {
    const tour = await Tour.findByPk(req.params.id);
    if (tour) {
      await tour.destroy();
      res.json({ message: 'Tour deleted' });
    } else {
      const error = new Error('Tour not found');
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
