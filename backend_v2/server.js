const mysql = require('mysql2')
//database connection

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

