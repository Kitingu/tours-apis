'use strict';
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10,2),
    feature_image_url: DataTypes.TEXT
  }, {});

  Service.associate = function(models) {
    // No associations needed
  };

  return Service;
};
