
var connectionProvider = require('../mysqlConnectionStringProvider.js');

var productCategoryDao = {
    createProductCategory: function (productCategory, onSuccessfulCallbackFunction) {
        var str = "insert into productcategory set ?";
        var cat = {
            CategoryName : productCategory.categoryName,
            Details: productCategory.categoryDetails,
            IsValid : true,
            CreatedDate : new Date()
        };
        var con = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        con.query(str, cat, function (err, result) {
            if (err) throw err;
            
            onSuccessfulCallbackFunction({ status: 'success' });
        
        });
        connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(con);

    },
    getAllProductCategory: function (onSuccessfulCallbackFunction) {
        var stmt = "select * from productcategory";
        var con = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        con.query(stmt, function (error, rows, fields) {
            if (error) { throw error; }
            onSuccessfulCallbackFunction(rows);
        });
        connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(con);
    },
   
 getProductCategoryById : function(Id, callbackFunction) {
        var stmt = "select * from productcategory where Id = ?";
        var con = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        con.query(stmt, [Id], function (error, row, field) {
            if (error) throw error;
            callbackFunction(row);
        });
        connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(con);
    },
    updateProductCategory: function (categoryName, details, productCategoryId, callback) {
        
        
        var con = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        var queryStatement = "UPDATE  productCategory SET CategoryName= ? ,  Details = ?, ModifiedDate = ?  WHERE id = ?";
        
        if (con) {
            
            con.query(queryStatement, [categoryName, details, new Date(), productCategoryId] , function (err, rows, fields) {
                if (err) { throw err; }
                console.log(rows);
                
                if (rows) {
                    
                    
                    callback({ status : 'successful' });
                }
            });
            
            connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(con);
        }
    },

    deleteProductCategoryById: function (productCategoryId, callbackFunction) {
        var stmt = "delete from productcategory where Id=?";
        var con = connectionProvider.mysqlConnectionStringProvider.getMysqlConnection();
        con.query(stmt, [productCategoryId], function (error, rows, field) {
            if (error) console.log(error.stack);
            callbackFunction({status:'success'});
        });
        connectionProvider.mysqlConnectionStringProvider.closeMysqlConnection(con);

    }
    
   
};
module.exports.productCategoryDao = productCategoryDao;