module.exports = (sequelize, Sequelize) => {
  const Job_assignment = sequelize.define("job_assignments", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    employee_id: {
      type: Sequelize.INTEGER
    },
    job_id: {
      type: Sequelize.INTEGER
    }
  });

  return Job_assignment;
};
