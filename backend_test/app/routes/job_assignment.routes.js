 module.exports = app => {
  const job_assignment = require("../controllers/job_assignment.controller.js");

  var router = require("express").Router();

  // Create a new Job
  router.post("/", job_assignment.create);

  // Retrieve all Jobs
  router.get("/", job_assignment.findAll);


  // Retrieve a single Job with id
  router.get("/:id", job_assignment.findOne);

  // Update a Job with id
  router.put("/:id", job_assignment.update);

  // Delete a Job with id
  router.delete("/:id", job_assignment.delete);

  // Delete all Jobs
  router.delete("/", job_assignment.deleteAll);

  app.use('/job-assignment', router);
};
