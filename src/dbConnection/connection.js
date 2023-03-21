const db = require('mysql2');

var mySqlConnection = db.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'gaurav@123',
    database : 'Demo',
    multipleStatements : true
  });

  mySqlConnection.connect((err)=> {
    if(!err){
        console.log('connected');
    }else{
        console.log('not connected ' +  JSON.stringify(err,undefined,2) ); 
    }
  });

module.exports = mySqlConnection;