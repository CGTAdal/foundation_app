'use strict';

ngApp.factory('Company', function($resource, $http) {
  function Company() {
    this.service = $resource('/api/companies/:id', {id: '@id'}, /*{'query': {method: 'GET', isArray: false}},*/ {'update': {method: 'PUT'}});
  };

  Company.prototype.all = function() {
    return this.service.query();
  };
  Company.prototype.find = function(companyId) {
    return this.service.query({id: companyId});
  };
  Company.prototype.delete = function(companyId) {
    return this.service.remove({id: companyId});
  };
  Company.prototype.create = function(attr) {
    return this.service.save(attr);
  };
  Company.prototype.update = function(attr) {
    return this.service.update(attr);
  };

  return new Company;
});

// http://alexpotrykus.com/blog/2013/12/07/angularjs-with-rails-4-part-1/
