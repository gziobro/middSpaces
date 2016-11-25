angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('PopupCtrl',function($scope, $ionicPopup, $timeout) {
  // A confirm dialog
  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Check In',
      template: 'Are you checking into this space?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        console.log('Yes');
      } else {
        console.log('No');
      }
    });
  };
})

.controller('addData',function($scope, $stateParams, checkin, $ionicPopup){
  $scope.data = checkin.all();//{
    //console.log($scope.data);
    //space: ' ',
  //  open: true
  //}
  $scope.submitting = false;
  $scope.submit = function(event){
    //console.log(event);
    $scope.submitting = true;
    $scope.data = {
      id: event.srcElement.id,
      open: false
    }
    checkin.update($scope.data).then(function(){
      //$scope.data = {
      //  id: event.srcElement.id,
      //  open: false
      //}
      $scope.submitting = false;
      console.log($scope.data.open);
      if ($scope.data.open == false){
        event.srcElement.style.backgroundColor = "#e31a1c";
      };
      checkin.occupy($scope.data);
      $ionicPopup.alert({
        title: "Thank you!",
        template: "You are now checked in."
      });

    })
  }
})
.controller('checkout', function($scope, $stateParams, checkin, $ionicPopup){
  $scope.data = checkin.all();
  $scope.submitting = false;
  $scope.checkingout = function(event){
    $scope.data = {
      space: "",
      open: true
    };
    checkin.out($scope.data);
  }
  console.log("checked out");
})
.controller('refresh', function($scope, $stateParams, checkin, $ionicPopup){
  $scope.data = checkin.all();
  $scope.submitting = false;
  $scope.refreshing = function(event){
    checkin.Refresh($scope.data);
  }
})
;
