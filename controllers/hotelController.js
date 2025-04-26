const { Hotel } = require('../models');

exports.getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.findAll();
    res.json(hotels);
  } catch (error) {
    next(error);
  }
};

exports.getHotelById = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    if (hotel) {
      res.json(hotel);
    } else {
      const error = new Error('Hotel not found');
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

exports.createHotel = async (req, res, next) => {
  try {
    const { name, location, price_per_night, feature_image_url } = req.body;

    if (!name || !location || price_per_night === undefined || !feature_image_url) {
      const error = new Error('Name, location, price per night, and feature image URL are required.');
      error.statusCode = 400;
      throw error;
    }

    if (isNaN(price_per_night)) {
      const error = new Error('Price per night must be a valid number.');
      error.statusCode = 400;
      throw error;
    }

    // 🔥 Duplicate check
    const existingHotel = await Hotel.findOne({ where: { name, location } });
    if (existingHotel) {
      const error = new Error('Hotel with the same name and location already exists.');
      error.statusCode = 409;
      throw error;
    }

    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (error) {
    next(error);
  }
};

exports.updateHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    if (hotel) {
      await hotel.update(req.body);
      res.json(hotel);
    } else {
      const error = new Error('Hotel not found');
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    if (hotel) {
      await hotel.destroy();
      res.json({ message: 'Hotel deleted' });
    } else {
      const error = new Error('Hotel not found');
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
