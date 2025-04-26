const { Destination } = require('../models');

exports.getAllDestinations = async (req, res, next) => {
  try {
    const destinations = await Destination.findAll();
    res.json(destinations);
  } catch (error) {
    next(error);
  }
};

exports.getDestinationById = async (req, res, next) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (destination) {
      res.json(destination);
    } else {
      const error = new Error('Destination not found');
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

exports.createDestination = async (req, res, next) => {
  try {
    const { name, description, feature_image_url } = req.body;

    if (!name || !description || !feature_image_url) {
      const error = new Error('Name, description, and feature image URL are required.');
      error.statusCode = 400;
      throw error;
    }

    // 🔥 Duplicate check
    const existingDestination = await Destination.findOne({ where: { name } });
    if (existingDestination) {
      const error = new Error('Destination with the same name already exists.');
      error.statusCode = 409;
      throw error;
    }

    const destination = await Destination.create(req.body);
    res.status(201).json(destination);
  } catch (error) {
    next(error);
  }
};

exports.updateDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (destination) {
      await destination.update(req.body);
      res.json(destination);
    } else {
      const error = new Error('Destination not found');
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (destination) {
      await destination.destroy();
      res.json({ message: 'Destination deleted' });
    } else {
      const error = new Error('Destination not found');
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
