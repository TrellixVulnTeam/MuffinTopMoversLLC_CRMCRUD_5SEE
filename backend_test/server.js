const express = require("express");
const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome To MuffinTop Movers LLC Backend System." });
});

require("./app/routes/employee.routes")(app);
require("./app/routes/customer.routes")(app);
require("./app/routes/jobs.routes")(app);
require("./app/routes/job_assignment.routes")(app);

//Sequelize database
db.sequelize.sync();


// drop the table if it already exists
//  db.sequelize.sync({ force: true }).then(() => {
//  console.log("Drop and re-sync db.");
//  });


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
