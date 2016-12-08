angular.module("productCategoryModule")
.factory("requiredFieldValidationService", requiredFieldValidationService);

function requiredFieldValidationService() {

    function _getErrorMsgs(requiredInfos){
    
        var ErrorMessages = [];
        console.log('infors are', requiredInfos);
        if (requiredInfos.length > 0)
        {
            angular.forEach(requiredInfos, function (info) {
                if (info.name != 'undefined'
                    &&
                    (info.name.length == 0
                    || info.name == null
                    || info.name=="")
                    ) {
                    ErrorMessages.push(info.errorMessage);
                }

            });
        }
    
        return ErrorMessages;
    }
    return {
        GetErrorMsgs : _getErrorMsgs
    };

}