const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


// Require models 
db.employees = require("./employee.model.js")(sequelize, Sequelize);
db.customers = require("./customer.model.js")(sequelize, Sequelize);
db.jobs = require("./jobs.model.js")(sequelize, Sequelize);
db.job_assignments = require("./job_assignment.model.js")(sequelize, Sequelize);

// Create relationships between tables
db.jobs.belongsTo(db.customers,{foreignKey:'customer_id', as:'jobs'});
db.job_assignments.belongsTo(db.employees,{foreignKey:'employee_id'});
db.job_assignments.belongsTo(db.jobs,{foreignKey:'job_id'});

module.exports = db;
