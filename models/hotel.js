'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hotel = sequelize.define('Hotel', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    price_per_night: DataTypes.DECIMAL(10,2),
    feature_image_url: DataTypes.TEXT,
    gallery_image_urls: DataTypes.ARRAY(DataTypes.TEXT)
  }, {});
  
  Hotel.associate = function(models) {
    // No associations yet
  };

  return Hotel;
};
