function productCategoryRouteConfig(app) {
    this.app = app;
    this.routeTable = [];
    this.init();
}

productCategoryRouteConfig.prototype.init = function () {

    this.addRoutes();
    this.processRoutes();

}

productCategoryRouteConfig.prototype.addRoutes = function () {
    
    this.routeTable.push(
        {
            requestType: 'get',
            requestUrl : '/createProductCategory',
            callbackFunction : function (req, res) {
                
                res.render('createProductCategory', { title : 'Create a product category' })
            }
        },
        {
            requestType: 'post',
            requestUrl : '/api/createProductCategory',
            callbackFunction: function (req, res) {
                var productCategoryDao = require('../Server/productCategoryDao/productCategoryDao.js');
                
                productCategoryDao.productCategoryDao.createProductCategory(req.body, function (status) {
                    res.json(status);
            
                });
            }
        },
        {
            requestType : 'get',
            requestUrl : '/viewProductCategory',
            callbackFunction : function (req, res) {
                
                    //res.json(status);
                    
                    res.render("viewProductCategory", { title: "view" });
                }
                //return;
            },
        {
            requestType : 'get',
            requestUrl : '/getAllProductCategory',
            callbackFunction : function (req, res) {
                
                var productCategoryDao = require('../Server/productCategoryDao/productCategoryDao.js');
                
                productCategoryDao.productCategoryDao.getAllProductCategory(function (productCategories) {
                    //console.log("in route config", data[0]);
                    res.json({ productCategories: productCategories });
                });
            }
        },

        {
            requestType : 'get',
            requestUrl : '/editProductCategory/:productCategoryById',
            callbackFunction : function (req, res) { 

                res.render("editProductCategory", {title:"Edit"});
            }
        },
        {
            requestType : 'get',
            requestUrl : '/getProductCategoryById/:productCategoryId',
            callbackFunction : function (req, res) {
                var productCategoryDao = require('../Server/productCategoryDao/productCategoryDao.js');

                console.log('productcategory in routeconfig file',req.params);
                productCategoryDao.productCategoryDao.getProductCategoryById(req.params.productCategoryId, function (productCategories) {
                    //console.log("in route config", data[0]);
                    res.json({ productCategory: productCategories });
                });
            }

        }, 
        {
            requestType : 'post',
            requestUrl : '/api/editProductCategory',
            callbackFunction : function (req, res) {
                var productCategoryDao = require('../Server/productCategoryDao/productCategoryDao.js');
                
               // console.log('productcategory in routeconfig file', req.body);//request.body is used in post while request.params in get?
                productCategoryDao.productCategoryDao.updateProductCategory(req.body.categoryName, req.body.categoryDetails,req.body.productCategoryId, function (status) {
                    //console.log("in route config", data[0]);
                   // if (status == 'successful') { alert('set properties here');};
                    res.json(status);
                });
            
            }
        }, 
         {
            requestType : 'delete',
            requestUrl : '/api/deleteProductCategoryById/:productCategoryId',
            callbackFunction : function (request, response) {
                
                var productCategoryDao = require('../Server/productCategoryDao/productCategoryDao.js');
                
                productCategoryDao.productCategoryDao.deleteProductCategoryById(request.params.productCategoryId, function (status) {
                    
                    response.json(status);
                
                });

            }
        }
    
    );

}

productCategoryRouteConfig.prototype.processRoutes = function () {
    var self = this;
    self.routeTable.forEach(function (routes) {
        if (routes.requestType == 'get') {
            self.app.get(routes.requestUrl, routes.callbackFunction);
        }
        else if (routes.requestType == 'post') {
            self.app.post(routes.requestUrl, routes.callbackFunction);
        }
        else if (routes.requestType == 'delete') { 
            self.app['delete'](routes.requestUrl, routes.callbackFunction);
        }
    });
}
module.exports = productCategoryRouteConfig;