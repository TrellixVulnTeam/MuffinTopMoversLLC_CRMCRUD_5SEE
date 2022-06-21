 module.exports = app => {
  const employees = require("../controllers/employee.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", employees.create);

  // Retrieve all Tutorials
  router.get("/", employees.findAll);


  // Retrieve a single Tutorial with id
  router.get("/:id", employees.findOne);

  // Retrieve a single Customer's Job with id
  router.get("/job-assignments/:id", employees.findEmployeeJobAssignments);

  // Update a Tutorial with id
  router.put("/:id", employees.update);

  // Delete a Tutorial with id
  router.delete("/:id", employees.delete);

  // Delete all Tutorials
  router.delete("/", employees.deleteAll);

  app.use('/employees', router);
};
