'use strict';

// initialize Angular App
var ngApp = angular.module('ngApp', [
  'ngResource',
  'ngRoute',
  //'ngAnimate',
  'mm.foundation'
  // 'mgcrea.ngStrap'
]);


// making AngularJS work with CSRF protection
ngApp.config(function($httpProvider) {
  var authToken = $("meta[name=\"csrf-token\"]").attr("content");
  $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken;
});

// Routes
ngApp.config(function ($routeProvider, $locationProvider, $logProvider) {
  $logProvider.debugEnabled(true);
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/dashboard', {
        templateUrl: '/templates/dashboard.html',
        controller: 'DashboardCtrl'
      })
    // .when('/animatedemo', {
    //     templateUrl: '/templates/animatedemo.html',
    //     controller: 'AnimateCtrl'
    //   })
    .otherwise({
        templateUrl: '/templates/dashboard.html',
        controller: 'DashboardCtrl'
      });
});

ngApp.run((function(_this) {
  return function($rootScope) {
    return $rootScope.$on('$viewContentLoaded', function() {
      return $(document).foundation();
    });
  };
})(this));


 ngApp.directive('aLeftpanel', function($document,$window) {
  return {
    restrict: 'A',
    link:function(scope, element, attrs) {
    var targetId = '';
      // console.log(scope+'\n\n'+element+'\n\n'+attrs+'\n\n'+attrs.aLeftpanel);
      targetId = attrs.aLeftpanel;
      jQuery(targetId).hide(0);
      //console.log(jQuery(document).height();)
      // console.log(jQuery($document).height()+'\n'+jQuery($window).height());

      jQuery(targetId).find('.a-fade').click(function(){
        applyCustomEffect();
      })

      element.on('click', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        applyCustomEffect();
      });

      function applyCustomEffect(){
        if(jQuery(targetId).is( ":hidden" ) == true){
          jQuery(targetId).show(500);
          // jQuery(targetId).show("slide",{direction: 'right'});
          // jQuery(targetId).show('slide', {direction: "left" });
        }else{
          jQuery(targetId).hide(500);
          // jQuery(targetId).hide("slide",{direction: 'left'});
          // jQuery(targetId).hide("slide", {direction: "left" });
        }
      }

     }
   };
 });

ngApp.directive('slideable', function () {
    return {
        restrict:'C',
        compile: function (element, attr) {
            // wrap tag
            var contents = element.html();
            element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

            return function postLink(scope, element, attrs) {
                // default properties
                attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                element.css({
                    'overflow': 'hidden',
                    'width': '0px',
                    'transitionProperty': 'width',
                    'transitionDuration': attrs.duration,
                    'transitionTimingFunction': attrs.easing
                });
            };
        }
    };
})
.directive('slideToggle', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var target, content;
            
            attrs.expanded = false;
            
            element.bind('click', function() {
                if (!target) target = document.querySelector(attrs.slideToggle);
                if (!content) content = target.querySelector('.slideable_content');
                
                if(!attrs.expanded) {
                    content.style.border = '1px solid rgba(0,0,0,0)';
                    // console.log(content.clientHeight+'\n\n'+content.clientWidth+'\n\n'+content);
                    // var y = content.clientHeight;
                    console.log(jQuery(angular.element(window)).width());
                    var y = jQuery(angular.element(window)).width(); // content.clientHeight;
                    content.style.border = 0;
                    target.style.width = y + 'px';
                } else {
                    target.style.width = '0px';
                }
                attrs.expanded = !attrs.expanded;
            });
        }
    }
});


ngApp.controller('ParentCtrl', function ($scope) {
  // $scope.title = 'Title set by parent';
  $scope.model = {title: 'Title set by parent'};
  $scope.greet = function(){
    alert('I m in the parent');
  }
  $scope.testing = function(){
    alert('I m in the parent testing');
  }
});

ngApp.controller('ChildCtrl', function ($scope) {
  // $scope.content = 'Title set by child';
  $scope.model = {title: 'Title set by child',content: 'Content set by child'};
  $scope.setModel = function(){
    $scope.model = {title: 'Title set by child setModel'};
  }
  $scope.greet = function(){
    alert('I m in the child');
  }
  $scope.childTesting = function(){
    alert('I m in the parent childTesting');
  }
  $scope.testing = function(){
    alert('I m in the child');
  }
});

ngApp.controller('FriendsCtrl', function ($scope,$http) {
  $scope.loadFriends = function(){
    $http.get('api/companies/4')
    .success(function(data){
      console.log(data);
      $scope.friends = data;
    })
    .error(function(){
      alert('Error')
    })
  }
});

// INLINE EDIT AND SAVE
// ngApp.controller('MaintestCtrl', function($scope) {

//   $scope.updateTodo = function(value) {
//     console.log('Saving title ' + value);
//     alert('Saving title ' + value);
//   };
  
//   $scope.cancelEdit = function(value) {
//     console.log('Canceled editing', value);
//     alert('Canceled editing of ' + value);
//   };
  
//   $scope.todos = [
//     {id:123, title: 'Lord of the things'},
//     {id:321, title: 'Hoovering heights'},
//     {id:231, title: 'Watership brown'}
//   ];
// });

// On esc event
ngApp.directive('onEsc', function() {
  return function(scope, elm, attr) {
    elm.bind('keydown', function(e) {
      if (e.keyCode === 27) {
        scope.$apply(attr.onEsc);
      }
    });
  };
});

// On enter event
ngApp.directive('onEnter', function() {
  return function(scope, elm, attr) {
    elm.bind('keypress', function(e) {
      if (e.keyCode === 13) {
        scope.$apply(attr.onEnter);
      }
    });
  };
});

// Inline edit directive
ngApp.directive('inlineEdit', function($timeout) {
  return {
    scope: {
      model: '=inlineEdit',
      handleSave: '&onSave',
      handleCancel: '&onCancel'
    },
    link: function(scope, elm, attr) {
      var previousValue;
      
      scope.edit = function() {
        scope.editMode = true;
        previousValue = scope.model;
        
        $timeout(function() {
          elm.find('input')[0].focus();
        }, 0, false);
      };
      scope.save = function() {
        scope.editMode = false;
        scope.handleSave({value: scope.model});
      };
      scope.cancel = function() {
        scope.editMode = false;
        scope.model = previousValue;
        scope.handleCancel({value: scope.model});
      };
    }
  };
});
