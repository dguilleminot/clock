  var clock = angular.module('clock',["ngAnimate","ngCordova"])

  .controller('mainCtrl',['$scope','$rootScope', '$timeout',function($scope,$rootScope, $timeout){
     $scope.isUp = true;
     $scope.setThis = "min";
     $scope.timer = {};
     $scope.timer.ms = 0;
     $scope.timer.s = 15;
     $scope.timer.min = 30;
     $scope.timer.hr = 1;

     var day = ["mon","tues","wed","thur","fry","sat","sun"]
     var newDate = new Date();
     $scope.date = {};

     $scope.date.da = day[newDate.getDay()-1];
     $scope.date.d = spacing(newDate.getDate());

     $scope.date.y = newDate.getFullYear()+1;
     $scope.date.m = spacing(newDate.getMonth()+1);

     $scope.score = {};
     $scope.score.ms = 0;
     $scope.score.s = 0;
     $scope.score.min = 0;
     $scope.score.hr = 0;

     $scope.active = {};

     $scope.init = function(mode){
          $scope.mode = mode || "clock";
          $scope.subControl = false;
          $scope.mainControl = true;
          $scope.isUp = true;
          $timeout(action, 400);

              function action(){
                  $scope.isUp = false;
                  mytimer.init()[$scope.mode]();
              }
     }

     $scope.chooseTime = function(argu){
          if($scope.mode !== "timer"){
              return;
          }
          if(!$scope.subControl){
              $scope.toggleSub();
          }
          $scope.setThis = argu;
          $scope.timer[argu] = 0;
          $scope.timeChosen = argu;
          mytimer.set($scope.timer);
     }

     $scope.setTime = function(nbr){
             var sl = $scope.setThis;
         $scope.timer[sl] =parseInt(($scope.timer[sl]+ ''+nbr) % 100);
             var newTime = mytimer.set($scope.timer);
     }
     $scope.toggleSub = function(){
          if($scope.mode !== "timer"){
              return;
          }
          $scope.mainControl = !$scope.mainControl;
          $scope.subControl = !$scope.subControl;
          $scope.timeChosen = (!$scope.subControl)? "" : "min";
          if(!$scope.subControl){
              $scope.timer.min = 0;
          }
     }
     $scope.scoreThis = function(stream){
          stream.ms = spacing(stream.ms);
          stream.s = spacing(stream.s);
          stream.min = spacing(stream.min);
          stream.hr = spacing(stream.hr);

          function spacing(value){
              var v = Math.floor(value);
              if(v < 10){
                  v = "0"+v;
              }
              return v;
          }
          $scope.$apply($scope.score = stream)
     }
     $scope.start = function(){
          var mode = $scope.mode,
          thisMode = $scope.active[mode];
          if(!thisMode){
              $scope.active[mode] = true;
              mytimer.start()
          }
     }

     $scope.pause = function(){
          var mode = $scope.mode,
              thisMode = $scope.active[mode];
          if(thisMode){
              $scope.active[mode] = false;
              mytimer.pause();
          }
     }



      mytimer.init()['timer']();
      mytimer.set($scope.timer);
      $scope.init();

    }])
