const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());


//database connection

const db = mysql.createConnection({
        host:'localhost',
        user:'admin',
        password:'',
        database:'muffintop',
        port: '3306'
        
});

// Connecting to database
db.connect((err)=> {
    if(err){
      console.log("Error in the connection")
      console.log(err)
    }
    else{
      console.log(`Database Connected`)
      db.query(`SHOW DATABASES`, 
      function (err, result) {
        if(err)
          console.log(`Error executing the query - ${err}`)
        else
          console.log("Result: ",result) 
      })
    }
})
// CONNECT TO DATABASE
db.connect();



//START ALL CUSTOMERS API



// Retrieve All Customers
app.get('/customers', function (req, res) {
    db.query('SELECT * FROM customers', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'List of all customers.' });
    });
});
//  Delete Customer Record
app.delete('/customers/:customer_ID', function (req, res) {

    let customer_ID = req.params.customer_ID;

    if (!customer_ID) {
        return res.status(400).send({ error: true, message: 'Please Provide Customer_ID of Customer You Wish To Delete.' });
    }
    db.query('DELETE FROM customers WHERE customer_ID = ?', [customer_ID], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Customer Has Been Successfully Removed... Refreshing Data...' });
    });
}); 
// Retrieve Customer With customer_ID
app.get('/customers/:customer_ID', function (req, res) {

    let customer_ID = req.params.customer_ID;

    if (!customer_ID) {
        return res.status(400).send({ error: true, message: 'Please Provide Customer_ID to GET Customer.' });
    }

    db.query('SELECT * FROM customers where customer_ID=?', customer_ID, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Customer Selected Successfully.' });
    });

});

// Add A New Customer  
app.post('/customers', function (req, res) {

    let fullname = req.body.Full_Name;
    let phone_number = req.body.Phone_Number;
    let address = req.body.Last_Known_Address;

    if (!fullname) {
        return res.status(400).send({ error: true, message: 'Please Provide A Full Name For The Customer.' });
    }
    if (!phone_number) {
        return res.status(400).send({ error: true, message: 'Please Provide A Phone Number For The Customer.' });
    }
    if (!address) {
        return res.status(400).send({ error: true, message: 'Please Provide An Address For The Customer.' });
    }

    db.query("INSERT INTO customers SET ? ", { Full_Name: fullname, Phone_Number: phone_number, Last_Known_Address: address }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New Customer Has Been Successfully Added.' });
    });
});
//  Update customer With customer_ID
app.put('/customers/:customer_ID', function (req, res) {

    let customer_ID = req.params.customer_ID;
    let fullname = req.body.Full_Name;
    let phone_number = req.body.Phone_Number;
    let address = req.body.Last_Known_Address;
  
    if (!customer_ID || !fullname || !phone_number || !address) {
        return res.status(400).send({ error: user, message: 'Please The Required Information Before Adding A Customer.' });
    }
    if (!fullname) {
        return res.status(400).send({ error: user, message: 'Please Provide The Full Name Of The Customer.' });
    }
    if (!phone_number) {
        return res.status(400).send({ error: user, message: 'Please Provide A Phone Number For The Customer.' });
    }
    if (!address) {
        return res.status(400).send({ error: user, message: 'Please Provide An Address For The Customer.' });
    }
    

    db.query("UPDATE customers SET Full_Name = ?, Phone_Number = ?, Last_Known_Address = ? WHERE customer_ID = ?", [fullname,phone_number, address, customer_ID], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Customer Information Has Been Succesfully Updated.' });
    });
});



//START EMPLOYEE API


// Get Employee With employee_id
app.get('/employees/:employee_id', function (req, res) {

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
app.post('/employees', function (req, res) {

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
app.put('/employees/:employee_id', function (req, res) {

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
app.delete('/employees/:employee_id', function (req, res) {

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
app.get('/employees', function (req, res) {
    db.query('SELECT * FROM employees', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'List of all employees.' });
    });
});





//START ALL JOBS API



// Retrieve All Jobs 
app.get('/job-orders', function (req, res) {
    db.query('SELECT * FROM jobs', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'List of all jobs.' });
    });
});
// Get Job With job_id
app.get('/job-orders/:job_id', function (req, res) {

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
app.post('/job-orders', function (req, res) {

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



    app.listen(3000, () => {
      console.log('Server started');
    })
