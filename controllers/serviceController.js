const { Service } = require('../models');

exports.getAllServices = async (req, res, next) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    next(error);
  }
};

exports.getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (service) {
      res.json(service);
    } else {
      const error = new Error('Service not found');
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

exports.createService = async (req, res, next) => {
  try {
    const { name, description, price, feature_image_url } = req.body;

    if (!name || !description || price === undefined || !feature_image_url) {
      const error = new Error('Name, description, price, and feature image URL are required.');
      error.statusCode = 400;
      throw error;
    }

    if (isNaN(price)) {
      const error = new Error('Price must be a valid number.');
      error.statusCode = 400;
      throw error;
    }

    // 🔥 Duplicate check
    const existingService = await Service.findOne({ where: { name } });
    if (existingService) {
      const error = new Error('Service with the same name already exists.');
      error.statusCode = 409;
      throw error;
    }

    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    next(error);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (service) {
      await service.update(req.body);
      res.json(service);
    } else {
      const error = new Error('Service not found');
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (service) {
      await service.destroy();
      res.json({ message: 'Service deleted' });
    } else {
      const error = new Error('Service not found');
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
