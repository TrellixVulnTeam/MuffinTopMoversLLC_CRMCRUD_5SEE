import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import customerRoutes from './routes/customers.js'
import employeeRoutes from './routes/employees.js'
import job_orderRoutes from './routes/jobs.js'
import job_assignmentRoutes from './routes/job-assignments.js'


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use('/customers', customerRoutes);
app.use('/job-assignments', job_assignmentRoutes);
app.use('/employees', employeeRoutes);
app.use('/job-orders', job_orderRoutes);

app.listen(3000, () => {console.log('Server started'); })

