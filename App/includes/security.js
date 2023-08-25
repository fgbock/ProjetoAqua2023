const crypto = require('crypto');
var sqlController = require('./dbConnection_internal')


var seedrandom = require("../node_modules/seedrandom");

  function generateSalt(username){
    var myrng = new seedrandom(username);
    var mySalt = myrng()*10e+15;
    //console.log(mySalt.toString(10));
    return mySalt.toString(10);
  }

  function createNewUser(username,password){
    var salt = generateSalt(username);
    const key = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');
    console.log(key);
    var query = "INSERT INTO usuarios \
    (username, hash, salt) \
    VALUES ?";
    var values = [
        [  
            username, 
            key.toString('hex'),
            salt
        ]
      ];
    sqlController.connection.query(query, [values], function (err, result) {
        if (err) throw err;
        console.log(`Succesfully inserted new user "${username}" into the database!`);
        console.log(`Values: ${values}`);
        console.log("Number of user records inserted: " + result.affectedRows);
        return 0;
    });
    return 0;
  }

createNewUser('admin','@mphitrite1');