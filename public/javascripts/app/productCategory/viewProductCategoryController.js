angular.module("productCategoryModule")
.controller("viewProductCategoryController", viewProductCategoryController);

viewProductCategoryController.$inject = ['$scope', 'productCategoryService'];

function viewProductCategoryController($scope, productCategoryService) {//controller constructor
    
    $scope.productCategories = [];
    productCategoryService.viewProductCategory().success(function (data) {
        $scope.productCategories = data.productCategories;
    });
    $scope.currentProductCategoryId = 0;
    $scope.setCurrentProductCategoryId = function (productCategoryId) {

        $scope.currentProductCategoryId = productCategoryId;
    }

    $scope.deleteProductCategory = function (element) {
        if ($scope.currentProductCategoryId > 0) {
            alert('controller' + $scope.currentProductCategoryId);

            productCategoryService.deleteProductCategoryById($scope.currentProductCategoryId)
            .success(function (data) {
                console.log(data);
                if (data && data.status && data.status == "success") {
                    window.location.href = "/viewProductCategory";
                }
            })
        }
    };

}