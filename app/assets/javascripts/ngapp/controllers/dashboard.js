'use strict';

var dashbord = ngApp.controller('DashboardCtrl', function($scope, Company, $rootScope, $routeParams, $modal) {

  // $scope.$on('$includeContentLoaded', function () {
  //     $(document).foundation();
  //     alert('asdfsdf');
  // });

  $scope.updateTodo = function(value) {
    console.log('Saving title ' + value);
    alert('Saving title ' + value);
  };
  
  $scope.cancelEdit = function(value) {
    console.log('Canceled editing', value);
    alert('Canceled editing of ' + value);
  };
  
  $scope.todos = [
    {id:123, title: 'Lord of the things'},
    {id:321, title: 'Hoovering heights'},
    {id:231, title: 'Watership brown'}
  ];

  $rootScope.companies = Company.all();
  // console.log($rootScope.companies);

  // open modal
  $scope.deleteCompany = function (company) {
    Company.delete(company.id);
    $rootScope.companies.splice( $rootScope.companies.indexOf(company), 1 );
    // $rootScope.companies.pop(company);
  };

  $scope.editCompany = function modal(company) {
  	// var company = $rootScope.companies[$rootScope.companies.indexOf(company)];
  	// console.log($rootScope.companies);
	  var modalInstance = $modal.open({
	    backdrop: 'static',
	    templateUrl: '/templates/edit_company.html',
	    controller: 'ModalInstanceCtrl',
      resolve: {
        company: function () {
          return company;
        }
      }
	  });
  };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
var ModalInstanceCtrl = function ($scope, $modalInstance, company, Company) {
  var oldCompany = company;
  $scope.company = company; //{name:'sdfsdfsdfs',url:'554554'}; //company;
  // console.log(company+'\n\n'+$scope.company);

  $scope.updateCompany = function() {
    var attr = {};
    attr = $scope.company;
    // save company to db
    var newCompany = Company.update(attr);
    // close pop-up
    $scope.$close();
    // add notification
    // Notification.add("success", "Company submitted successfully!");
  };

  $scope.cancel = function () {
    // console.log(JSON.stringify(oldCompany));
    $scope.company = oldCompany;
    $modalInstance.dismiss('cancel');
  };
};