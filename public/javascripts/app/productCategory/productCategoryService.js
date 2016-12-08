angular.module("productCategoryModule")
.factory("productCategoryService", productCategoryService);

productCategoryService.$inject = ['$http', '$location'];

function productCategoryService($http,$location) {
    return {
        createProductCategory: function (productCategory) {
            return $http.post('/api/createProductCategory', {
                categoryName:productCategory.categoryName,
                categoryDetails:productCategory.categoryDetails
            });
        },
        viewProductCategory: function () {
            return $http.get('/getAllProductCategory');
        },
        getEndpointUrl: function () {
            var path = $location.absUrl().split("/");
            var id = path[path.length - 1];

            return id;
        },
            getProductCategoryById: function (productCategoryById) {
                        return $http.get('/getProductCategoryById/'+ productCategoryById);
            },
            updateProductCategory: function (productCategory, productCategoryId) {

                return $http.post('/api/editProductCategory', {
                    categoryName: productCategory.categoryName,
                    categoryDetails: productCategory.categoryDetails,
                    productCategoryId : productCategoryId
                });
            },

            deleteProductCategoryById: function (productCategoryId) {
                return $http['delete']('/api/deleteProductCategoryById/' + productCategoryId);
            }
    }
}