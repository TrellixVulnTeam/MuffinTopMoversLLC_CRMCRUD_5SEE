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
// All routes are starting with customers2/

// Retrieve All Customers
router.get('/', function (req, res) {
    db.query('SELECT * FROM customers', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'List of all customers.' });
    });
});
//  Delete Customer Record
router.delete('/:customer_ID', function (req, res) {

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
router.get('/:customer_ID', function (req, res) {

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
router.post('/', function (req, res) {

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
router.put('/:customer_ID', function (req, res) {

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

export default router;