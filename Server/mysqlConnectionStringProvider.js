var mysql = require('mysql');
var mysqlconnectionstring = require('./mysqlConnectionString.js');
var mysqlConnectionStringProvider = {
// this json object will have two keys alongwith values, values returned by functions
    getMysqlConnection : function () {
        var connection = mysql.createConnection(mysqlconnectionstring.mysqlConnectionString.connection.dev);
        
        return connection;
    
    },
    closeMysqlConnection: function (currentConnection) {
        if (currentConnection) { 
            currentConnection.end();
        }
    }
};
module.exports.mysqlConnectionStringProvider = mysqlConnectionStringProvider;