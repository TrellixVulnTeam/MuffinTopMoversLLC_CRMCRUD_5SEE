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
//START EMPLOYEE API


// Get Employee With employee_id
router.get('/:employee_id', function (req, res) {

    let employee_id = req.params.employee_id;

    if (!employee_id) {
        return res.status(400).send({ error: true, message: 'Please Provide Employee_ID to GET Employee.' });
    }

    db.query('SELECT * FROM employees where employee_id=?', employee_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Employee Selected Successfully.' });
    });

});
// Add A New Employee  
router.post('/', function (req, res) {

    let full_name = req.body.full_name;
    let phone_number = req.body.phone_number;
    let address = req.body.address;
    let email = req.body.email;
    let role = req.body.role;


    if (!full_name) {
        return res.status(400).send({ error: true, message: 'Please Provide A Full Name For The Employee.' });
    }
    if (!phone_number) {
        return res.status(400).send({ error: true, message: 'Please Provide A Phone Number For The Employee.' });
    }
    if (!address) {
        return res.status(400).send({ error: true, message: 'Please Provide An Address For The Employee.' });
    }
    if (!email) {
        return res.status(400).send({ error: true, message: 'Please Provide An Email Address For The Employee.' });
    }
    if (!role) {
        return res.status(400).send({ error: true, message: 'Please Provide A Role For The Employee.' });
    }

    db.query("INSERT INTO employees SET ? ", { full_name: full_name, phone_number: phone_number, address: address, email: email, role: role }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New Employee Has Been Successfully Added.' });
    });
});
//  Update Employee With employee_id
router.put('/:employee_id', function (req, res) {

    let employee_id = req.params.employee_id;
    let full_name = req.body.full_name;
    let phone_number = req.body.phone_number;
    let address = req.body.address;
    let email = req.body.email;
    let role = req.body.role;


    
    if (!full_name) {
        return res.status(400).send({ error: true, message: 'Please Provide A Full Name For The Employee.' });
    }
    if (!phone_number) {
        return res.status(400).send({ error: true, message: 'Please Provide A Phone Number For The Employee.' });
    }
    if (!address) {
        return res.status(400).send({ error: true, message: 'Please Provide An Address For The Employee.' });
    }
    if (!email) {
        return res.status(400).send({ error: true, message: 'Please Provide An Email Address For The Employee.' });
    }
    if (!role) {
        return res.status(400).send({ error: true, message: 'Please Provide A Role For The Employee.' });
    }
    if (!employee_id|!full_name| !phone_number | !address | !email | !role) {
        return res.status(400).send({ error: true, message: 'Please Provide The Neccessary Details For Employee.' });
    }
    


    db.query("UPDATE employees SET full_name = ?, phone_number = ?, address = ?, email = ?, role = ? WHERE employee_id = ?", [full_name,phone_number, address, email, role, employee_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Employee Information Has Been Successfully Updated.' });
    });
});

// Delete Employee Record
router.delete('/:employee_id', function (req, res) {

    let employee_id = req.params.employee_id;

    if (!employee_id) {
        return res.status(400).send({ error: true, message: 'Please Provide Employee_ID of Employee You Wish To Delete.' });
    }
    db.query('DELETE FROM employees WHERE employee_id = ?', [employee_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Employee Has Been Successfully Removed... Refreshing Data...' });
    });
}); 
// Retrieve All Employees 
router.get('/', function (req, res) {
    db.query('SELECT * FROM employees', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'List of all employees.' });
    });
});

export default router;