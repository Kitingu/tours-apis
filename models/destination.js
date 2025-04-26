'use strict';
module.exports = (sequelize, DataTypes) => {
  const Destination = sequelize.define('Destination', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    feature_image_url: DataTypes.TEXT,
    gallery_image_urls: DataTypes.ARRAY(DataTypes.TEXT)
  }, {});

  Destination.associate = function (models) {
    Destination.hasMany(models.Tour, { foreignKey: 'destination_id' });
  };

  return Destination;
};
