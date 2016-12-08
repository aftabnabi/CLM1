angular.module("productCategoryModule")
.controller('productCategoryController', productCategoryController);

productCategoryController.$inject = ['$scope', 'productCategoryService','$timeout','$location','$http','$window','requiredFieldValidationService'];

function productCategoryController($scope, productCategoryService, $timeout, $location, $http, $window, requiredFieldValidationService) {

    $scope.Message = {
        text:"",
        showMessage:false
    };
    function displayMessage() {
        $scope.Message.text = "Record created successfully";

    }
    function clearMessage() {
        $scope.Message.text = "";
        $scope.Message.showMessage = false;
        clearCategory();
    }
    $scope.productCategory = {
        categoryDetails: '',
        categoryName:''
    };
    function clearCategory() {
        $scope.productCategory.categoryName ="";
        $scope.productCategory.categoryDetails = "";
    }
    $scope.createProductCategory = function (productCategory) {

        var validationMessages = requiredFieldValidationService.GetErrorMsgs([
            { name: $scope.productCategory.categoryName || "", errorMessage: "Please enter name" },
            { name: $scope.productCategory.categoryDetails || "", errorMessage: "Please enter details" }]);

        if (validationMessages.length > 0) {
            //clearMessage();
            $scope.Message.showMessage = true;
            angular.element("#validationErrorsList").empty();

            validationMessages.forEach(function (errorMessage) {
                angular.element("<li></li>").html(errorMessage).appendTo("#validationErrorsList");
            });

        }
        else {
            
                productCategoryService.createProductCategory(productCategory)
                .success(function (data) {
                    if (data && data.status == 'success') {
                        displayMessage();
                        $timeout(function () { clearMessage(); }, 5000);
                    }
                });
        }//end else
    }//end function
 
$scope.viewProductCategory = function () {
        $window.location.href = "/viewProductCategory";
    }
}