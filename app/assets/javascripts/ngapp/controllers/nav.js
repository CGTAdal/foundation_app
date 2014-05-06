'use strict';

ngApp.controller('NavCtrl', function($scope, $modal, $rootScope, Company) {
  $scope.company = {
    url: "http://",
    name: ""
  };
  
  // open modal
  $scope.open = function modal() {
    var modalInstance = $modal.open({
      backdrop: 'static',
      templateUrl: '/templates/submit_company.html',
      controller: 'NavCtrl'
    });
  };

  // handle save from modal form
  $scope.submitCompany = function() {
    var attr = {};
    attr = $scope.company;
    // console.log(attr);
    // save company to db
    var newCompany = Company.create(attr);
    // update companies
    $rootScope.companies.push(newCompany);
    // close pop-up
    $scope.$close();
    // add notification
    // Notification.add("success", "Company submitted successfully!");
  };

});
