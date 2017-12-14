var mssqlConnectionString = {
    connection : {
        dev: {
            host: 'localhost',
            user: 'spectrum',
            password: '',
            database:'productmanagement'
        },
        local: {},
        production: {}
    
    }
};
module.exports.mssqlConnectionString = mssqlConnectionString;