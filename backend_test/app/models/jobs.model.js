module.exports = (sequelize, Sequelize) => {
  const Job = sequelize.define("job", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    customer_id: {
      type: Sequelize.INTEGER,
    },
    documents: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    completion_date: {
      type: Sequelize.DATEONLY
    }
  });

  return Job;
};
