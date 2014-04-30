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

/*
ngApp.directive('myCustomer', ['$document', function($document) {
    return function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;

      element.css({
       position: 'relative',
       border: '1px solid red',
       backgroundColor: 'lightgrey',
       cursor: 'pointer'
      });
      console.log(scope+'\n\n'+String.toString(element)+'\n\n'+attr);
      
      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        // event.preventDefault();
        // startX = event.pageX - x;
        // startY = event.pageY - y;
        // $document.on('mousemove', mousemove);
        // $document.on('mouseup', mouseup);
        
      });

      function mousemove(event) {
        // y = event.pageY - startY;
        // x = event.pageX - startX;
        // element.css({
        //   top: y + 'px',
        //   left:  x + 'px'
        // });
        
      }

      function mouseup() {
        // $document.off('mousemove', mousemove);
        // $document.off('mouseup', mouseup);
      }
    };
  }]);
*/

 ngApp.directive('aLeftpanel', function($document,$window) {
  return {
    restrict: 'A',
    link:function(scope, element, attrs) {
    var targetId = '';
      // console.log(scope+'\n\n'+element+'\n\n'+attrs+'\n\n'+attrs.aLeftpanel);
      targetId = attrs.aLeftpanel;
      jQuery(targetId).hide(0);
      //console.log(jQuery(document).height();)
      console.log(jQuery($document).height()+'\n'+jQuery($window).height());

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
