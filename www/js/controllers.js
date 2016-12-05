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

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, checkin) {
  $scope.chat = Chats.get($stateParams.chatId);
  checkin.setFloor($scope.chat);
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
  //$scope.data = checkin.all();
  //{
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
        event.srcElement.style.backgroundColor = "#E31a1C";
      };
      checkin.occupy($scope.data);
      $ionicPopup.alert({
        title: "Thank you!",
        template: "You are now checked in."
      });
    })
  }
  $scope.disable = function(event){}
})

.controller('checkout', function($scope, $stateParams, checkin, $ionicPopup){
  //$scope.data = checkin.all();
  $scope.submitting = false;
  $scope.checkingout = function(event){
    $scope.data = {
      space: "",
      open: true
    };
    console.log($scope.data);
    checkin.out($scope.data);
    $ionicPopup.alert({
      title: "You checked out!"
    })
  }

  console.log("checked out");
})

.controller('refresh', function($scope, $stateParams, checkin, $ionicPopup, $ionicLoading){
  // $scope.show=function(){ //initiates spinner
  //   $ionicLoading.show({
  //     template: '<ion-spinner></ion-spinner>'
  //   });
  // };
  // $scope.show(); //calls spinner function
  $scope.data = checkin.all();
  checkin.Refresh($scope.data);
  $scope.submitting = false;
  // $scope.hide=function(){ //function to hide spinner
  //   $ionicLoading.hide();
  // };
  // $scope.hide(); // hides spinner
  $scope.refreshing = function(event){ // Refresh function called on-click of refresh button
    // $scope.show=function(){
    //   $ionicLoading.show({
    //     template: '<ion-spinner></ion-spinner>'
    //   });
    // };
    // $scope.show($ionicLoading);
    console.log($scope.data);
    checkin.Refresh($scope.data);
    // $scope.hide=function(){ //function to hide spinner
    //   $ionicLoading.hide();
    // };
    // $scope.hide($ionicLoading);
  }
})
.controller('dash', function($scope, $stateParams, checkin){ //used to input checked in status on tab-dash page
  $scope.submitting=false;
  $scope.status=checkin.setStatus();
  console.log($scope.status);
  return $scope.status;
  $scope.getStatus=function(){
    return checkin.setStatus();
  };
})

.controller('zoom', function($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show()
  }
})
  
.controller('count', function($scope, $stateParams, checkin){
  $scope.Number=checkin.keepCount();
  console.log($scope.Number);
  return $scope.Number;
})
;
