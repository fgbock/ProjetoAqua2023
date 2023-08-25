var security = require("./security")
var args = process.argv.slice(2);


//security.createNewUser('admin','@mphitrite1');

// Call with first arg as the username and second arg as the password
security.createNewUser(args[0],args[1]);