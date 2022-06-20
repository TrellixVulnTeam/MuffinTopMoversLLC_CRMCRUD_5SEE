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

// Retrieve All Jobs 
router.get('/', function (req, res) {
    db.query('SELECT * FROM jobs', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'List Of All Jobs.' });
    });
});
// Get Job With job_id
router.get('/:job_id', function (req, res) {

    let job_id = req.params.job_id;

    if (!job_id) {
        return res.status(400).send({ error: true, message: 'Please Provide Job_ID to GET Job.' });
    }

    db.query('SELECT * FROM jobs where job_id=?', job_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Job Selected Successfully.' });
    });

});
// Add A New Job Order  
router.post('/', function (req, res) {

    let customer_id = req.body.customer_id;
    let related_documents = req.body.related_documents;
    let date_completion = req.body.date_completion;
    let job_status = req.body.job_status;


    if (!customer_id) {
        return res.status(400).send({ error: true, message: 'Please Provide A Customer_ID Associated With This Job.' });
    }
    if (!related_documents) {
        return res.status(400).send({ error: true, message: 'Please Attach The Related Documents For This Job.' });
    }
    if (!date_completion) {
        return res.status(400).send({ error: true, message: 'Please Provide An Estimated Date Of Completion For This Job.' });
    }
    if (!job_status) {
        return res.status(400).send({ error: true, message: 'Please Set A Job Status Before Proceeding.' });
    }


    db.query("INSERT INTO jobs SET ? ", { customer_id: customer_id, related_documents: related_documents, date_completion: date_completion, job_status: job_status }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New Job Has Been Successfully Added.' });
    });
});

//  Update Job With job_id
router.put('/:job_id', function (req, res) {

    let job_id = req.params.job_id;
    let customer_id = req.body.customer_id;
    let related_documents = req.body.related_documents;
    let date_completion = req.body.date_completion;
    let job_status = req.body.job_status;

    
    if (!customer_id) {
        return res.status(400).send({ error: true, message: 'Please Provide A Valid Customer_ID Associated With This Job Order.' });
    }
    if (!job_id) {
        return res.status(400).send({ error: true, message: 'Please Provide A Valid Job_ID Before Proceeding.' });
    }
    if (!related_documents) {
        return res.status(400).send({ error: true, message: 'Please Provide Any Related Documents For This Job.' });
    }
    if (!date_completion) {
        return res.status(400).send({ error: true, message: 'Please Provide An Estimated Date Of Completion For This Job.' });
    }
    if (!job_status) {
        return res.status(400).send({ error: true, message: 'Please Set A Valid Job Status For This Job.' });
    }
    if (!job_id|!customer_id| !related_documents | !date_completion | !job_status | !role) {
        return res.status(400).send({ error: true, message: 'Please Provide The Neccessary Details Before Updating This Job.' });
    }
    


    db.query("UPDATE jobs SET customer_id = ?, related_documents = ?, date_completion = ?, job_status = ? WHERE job_id = ?", [customer_id,related_documents, date_completion, job_status, job_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Job Order Information Has Been Successfully Updated.' });
    });
});
// Delete Job Order Record
router.delete('/:job_id', function (req, res) {

    let job_id = req.params.job_id;

    if (!job_id) {
        return res.status(400).send({ error: true, message: 'Please Provide Job_ID of Job Order You Wish To Delete.' });
    }
    db.query('DELETE FROM jobs WHERE job_id = ?', [job_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Job Order Has Been Successfully Deleted... Refreshing Data...' });
    });
}); 

// Get Job Assignment with assignment_id
router.get('/job-assignments', function (req, res) {

    let employee_name = req.body.employee_name;

    if (!employee_name) {
        return res.status(400).send({ error: true, message: 'Please Provide Employee Name to GET Job Assignemnts.' });
    }

    db.query('SELECT `full_name` FROM employees where full_name=?', employee_name, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Employee ID Selected Successfully By Employee Name.' });
    });

});

export default router;