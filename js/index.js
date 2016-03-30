var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope, $timeout) {

  $scope.work = 25;
  $scope.break = 5;
  $scope.switch = "work";

  $scope.breakup = function() { $scope.break++; }
  $scope.breakdown = function() { if ($scope.break > 1) $scope.break--; }
  $scope.workup = function() { $scope.work++; }
  $scope.workdown = function() { if ($scope.work > 1) $scope.work--; }

  $scope.ponies = [];

  $scope.start = function() {
    $scope.startbutton = true;
    $scope.counter = $scope.work * 60;
    $scope.onTimeout = function() {
      $scope.counter--;
      mytimeout = $timeout($scope.onTimeout, 1000);
      $scope.minutes = Math.floor($scope.counter / 60);
      $scope.seconds = $scope.counter - ($scope.minutes * 60);

      if ($scope.seconds > 9) {
        $scope.clock = $scope.minutes + ":" + $scope.seconds;
      } else {
        $scope.clock = $scope.minutes + ":0" + $scope.seconds;
      }

      if ($scope.counter === 0 && $scope.switch == "work") {
        $scope.counter = $scope.break * 60;
        $scope.switch = "break";
        var audio = new Audio('https://dl.dropboxusercontent.com/u/31750021/horn.mp3');
        audio.play();
        var num = Math.floor(Math.random() * (162 - 1 + 1)) + 1;
        $scope.ponies.push({
          img: "http://ponyfac.es/" + num + "/thumb"
        })
        $scope.pony = $scope.ponies.length;
        if ($scope.pony === 1) {
          $scope.ponyplur = "pony";
        } else {
          $scope.ponyplur = "ponies";
        }
      } else if ($scope.counter === 0 && $scope.switch == "break") {
        $scope.counter = $scope.work * 60;
        $scope.switch = "work";
      }
    }

    var mytimeout = $timeout($scope.onTimeout, 1000);

    $scope.stop = function() {
      $scope.startbutton = false;
      $timeout.cancel(mytimeout);
    }

  }

});