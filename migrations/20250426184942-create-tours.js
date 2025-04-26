'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: Sequelize.STRING,
      destination_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Destinations',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      duration_days: Sequelize.INTEGER,
      price: Sequelize.DECIMAL(10,2),
      description: Sequelize.TEXT,
      feature_image_url: Sequelize.TEXT,
      gallery_image_urls: Sequelize.ARRAY(Sequelize.TEXT),
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tours');
  }
};
