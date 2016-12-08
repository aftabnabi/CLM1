angular.module("productCategoryModule")
.controller("editProductCategoryController", editProductCategoryController);

editProductCategoryController.$inject = ['$scope', 'productCategoryService','requiredFieldValidationService','$timeout']


function editProductCategoryController($scope, productCategoryService,requiredFieldValidationService, $timeout ) {

    $scope.productCategory = {
        categoryName:'',
        categoryDetails:''
    };

    productCategoryService.getProductCategoryById(productCategoryService.getEndpointUrl()).success(function (data) {
        $scope.productCategory.categoryName = data.productCategory[0].CategoryName;
        $scope.productCategory.categoryDetails = data.productCategory[0].Details;
    });

    $scope.ValidationError = {
        showErrorMessage:false
    };
    $scope.Message = {
        showMessage: false,
        text:""
    }
    $scope.updateProductCategory = function (productCategory) {

        var validationMessages = requiredFieldValidationService.GetErrorMsgs([
            { name: $scope.productCategory.categoryName || "", errorMessage: "Please provide category name" },
            { name: $scope.productCategory.categoryDetails || "", errorMessage: "Please provide category details" }
        ]);

        if (validationMessages.length > 0) {
            $scope.ValidationError.showErrorMessage = true;
            angular.element("#validationErrorsList").empty();
            validationMessages.forEach(function (errorMessage) {
                angular.element("<li></li>").html(errorMessage).appendTo("#validationErrorsList");
            });
        }
        else {


            var productCategoryId = productCategoryService.getEndpointUrl();
            productCategoryService.updateProductCategory(productCategory, productCategoryId).success(function (status) {

                $scope.Message.showMessage = true;
                $scope.Message.text = "Record updated.";

                $timeout(function () {
                    $scope.Message.showMessage = false;
                    $scope.Message.text=""
                    $scope.ValidationError.showErrorMessage = false;
                    $scope.productCategory.categoryName = "";
                    $scope.productCategory.categoryDetails = "";
                }, 3000);
            });

        }
    }
}