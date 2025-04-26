const { Sequelize } = require('sequelize');
const config = require('../config/config.json').development;

const sequelize = new Sequelize('', config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false,
});

(async () => {
  try {
    await sequelize.query(`CREATE DATABASE "${config.database}"`);
    console.log(`✅ Database "${config.database}" created successfully.`);
    process.exit(0);
  } catch (error) {
    if (error.original && error.original.code === '42P04') {
      console.log(`⚠️ Database "${config.database}" already exists.`);
      process.exit(0);
    } else {
      console.error('❌ Error creating database:', error.message);
      process.exit(1);
    }
  }
})();
