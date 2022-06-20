import express from 'express';
import mysql from 'mysql2';

const router = express.Router();
const db = mysql.createConnection({
    host:'localhost',
    user:'admin',
    password:'',
    database:'muffintop',
    port: '3306'
    
});
db.connect((err)=> {
    if(err){
      console.log("Error in the connection")
      console.log(err)
    }
})

// Retrieve All Job Assignments
router.get('/', function (req, res) {
    db.query('SELECT * FROM job_assignments', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'List Of All Job Assignments.' });
    });
});

// Get Job Assignments with Employee_Name
router.get('/employee-name', function (req, res) {

    let employee_name = req.body.employee_name;

    if (!employee_name) {
        return res.status(400).send({ error: true, message: 'Please Provide Employee Name to GET Job Assignemnts.' });
    }

    db.query('SELECT `employee_id` FROM employees where full_name=?', employee_name, function (error, results, fields) {
        if (error) throw error;
        console.log(results)
        return res.send({ error: false, data: results[0], message: 'Employee ID Selected Successfully By Employee Name.' });
    });

});

// Add A New Job Assignment  
router.post('/', function (req, res) {

    let employee_id = req.body.employee_id;
    let job_id = req.body.job_id;



    if (!employee_id) {
        return res.status(400).send({ error: true, message: 'Please Provide An Employee_ID Associated With This Job Assignment.' });
    }
    if (!job_id) {
        return res.status(400).send({ error: true, message: 'Please Provide A Job_ID Associated With This Job Assignment.' });
    }


    db.query("INSERT INTO job_assignments SET ? ", { employee_id: employee_id, job_id: job_id}, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New Job Assignment Has Been Successfully Generated.' });
    });
});

//  Update Job Assignment With assignment_id
router.put('/:assignment_id', function (req, res) {

    let assignment_id = req.params.assignment_id;
    let employee_id = req.body.employee_id;
    let job_id = req.body.job_id;


    
    if (!assignment_id) {
        return res.status(400).send({ error: true, message: 'Please Provide A Valid Customer_ID Associated With This Job Order.' });
    }
    if (!employee_id) {
        return res.status(400).send({ error: true, message: 'Please Provide A Valid Job_ID Before Proceeding.' });
    }
    if (!job_id) {
        return res.status(400).send({ error: true, message: 'Please Provide Any Related Documents For This Job.' });
    }
    if (!job_id|!assignment_id| !job_id) {
        return res.status(400).send({ error: true, message: 'Please Provide The Neccessary Details Before Updating This Job Assignment.' });
    }
    


    db.query("UPDATE job_assignments SET employee_id = ?, job_id = ? WHERE assignment_id = ?", [employee_id,job_id, assignment_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Job Assignment Information Has Been Successfully Updated.' });
    });
});
// Delete Job Assignment Record
router.delete('/:assignment_id', function (req, res) {

    let assignment_id = req.params.assignment_id;

    if (!assignment_id) {
        return res.status(400).send({ error: true, message: 'Please Provide Assignment_ID of Job Assignment You Wish To Delete.' });
    }
    db.query('DELETE FROM job_assignments WHERE assignment_id = ?', [assignment_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Job Assignment Has Been Successfully Deleted... Refreshing Data...' });
    });
}); 

export default router;