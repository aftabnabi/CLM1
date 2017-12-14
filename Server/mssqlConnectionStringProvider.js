var mssql = require('mssql');
var mssqlconnectionstring = require('./mssqlConnectionString.js');
var mssqlConnectionStringProvider = {
// this json object will have two keys alongwith values, values returned by functions
    getMysqlConnection : function () {
        var connection = mssql.createConnection(mssqlconnectionstring.mssqlConnectionString.connection.dev);
        
        return connection;
    
    },
    closeMssqlConnection: function (currentConnection) {
        if (currentConnection) { 
            currentConnection.end();
        }
    }
};
module.exports.mssqlConnectionStringProvider = mysqlConnectionStringProvider;