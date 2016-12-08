var mysqlConnectionString = {
    connection : {
        dev: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database:'productmanagement'
        },
        local: {},
        production: {}
    
    }
};
module.exports.mysqlConnectionString = mysqlConnectionString;