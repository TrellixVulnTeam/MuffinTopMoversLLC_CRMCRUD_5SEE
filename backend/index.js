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
db.connect();
// Retrieve all users 
app.get('/customers', function (req, res) {
    db.query('SELECT * FROM customers', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'List of all customers.' });
    });
});
// Retrieve user with id 
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
// Add a new user  
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
//  Update user with id
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
        return res.send({ error: false, data: results, message: 'Customer Full_Name has been updated successfully.' });
    });
});
//  Delete user
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

app.listen(3000,()=>{
    console.log('Server Running...');
})