'use strict';
module.exports = (sequelize, DataTypes) => {
    const Tour = sequelize.define('Tour', {
        name: DataTypes.STRING,
        destination_id: DataTypes.INTEGER,
        duration_days: DataTypes.INTEGER,
        price: DataTypes.DECIMAL(10, 2),
        description: DataTypes.TEXT,
        feature_image_url: DataTypes.TEXT,
        gallery_image_urls: DataTypes.ARRAY(DataTypes.TEXT)
    }, {});

    Tour.associate = function (models) {
        Tour.belongsTo(models.Destination, { foreignKey: 'destination_id' });
    };

    return Tour;
};
