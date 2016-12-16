angular.module('starter.services', [])

.config(function($ionicConfigProvider) {    // gets rid of FloorPlans on < button
  $ionicConfigProvider.backButton.previousTitleText(false).text('');
  })

.service('checkin', ['$q', '$http', function($q, $http){
  var api_url= 'https://sheetsu.com/apis/v1.0/73e7d27138f0';

  var currentID = 1;
  var occupied = ""; //stores the occupied space name
  var floorID;
  var floorArray = [[55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73],[36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54],[6,7,8,9],[10,11,12,13,14,15],[29,30,31,32,33,34,35],[16,17,18,19,20,21,22,23],[24,25,26,27,28]];
  var spaceArray;
  var everything;
  var checkinCount=0;

  var ret={
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },
    all: function(){
      var deferred = $q.defer();
      var buttonID= event.srcElement.id;
      console.log("Requesting data");
      $http.get(api_url).then(function(resp){
        everything=resp.data;
        //console.log(everything);
        if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
        deferred.resolve(resp.data);
      })
      return deferred.promise;
    },
    add: function(data){
      var deferred = $q.defer();
      currentID ++;
      data.id=currentID;
      $http.post(api_url, data).then(function(resp){
        deferred.resolve(resp.data);
      });
      return deferred.promise;
    },
    update: function(data){ //checkin to a space
      var buttonID= event.srcElement.id;
      var deferred = $q.defer();
      $http.patch(api_url + '/id/' + buttonID, data).then(function(resp){
        deferred.resolve(resp.data);
        everything=resp.data;
      });
      console.log(spaceArray);
      for (i=spaceArray[0]-1; i<(spaceArray.length+spaceArray[0]-1); i++){ //Disables the rest of the buttons on the page
        document.getElementById(everything[i].id).disabled = true;
      }
      checkinCount++;
      console.log(document.getElementById(100));
      document.getElementById(100).disabled=false;
      return deferred.promise;
    },
    occupy: function(data){ //updates occupied variable to reflect space that is checked into
      console.log(data);
      var buttonID= data.id;
      var deferred = $q.defer();
      $http.get(api_url + '/id/'+buttonID).then(function(resp){
        occupied = resp.data[0].space;
        console.log(occupied + " occupied");
        deferred.resolve(resp.data);
      });
      return deferred.promise;
    },
    out: function(data){
      var deferred = $q.defer();
      data.space = occupied;
      console.log(data.space + " has been checked out");
      $http.patch(api_url +'/space/' + occupied, data).then(function(resp){
        occupied = "";
        deferred.resolve(resp.data);
        console.log(resp.data);
      });
      document.getElementById(100).disabled=true;
      console.log(document.getElementById(100));
      return deferred.promise;
    },
    Refresh: function(data){
      var deferred = $q.defer();
      var IDarray = [];
      var d = data.$$state.value;
      console.log("Requesting data");
      $http.get(api_url).then(function(resp){
        everything=resp.data;
        console.log(resp.data);
        if (floorID.id==0){
          spaceArray=floorArray[0];
        }
        if (floorID.id==1){
          spaceArray=floorArray[1];
        }
        if (floorID.id==2){
          spaceArray=floorArray[2];
        };
        if (floorID.id==3){
          spaceArray=floorArray[3];
        };
        if (floorID.id==4){
          spaceArray=floorArray[4];
        };
        if (floorID.id==5){
          spaceArray=floorArray[5];
        };
        if (floorID.id==6){
          spaceArray=floorArray[6];
        };
        console.log(spaceArray);
        for (i=spaceArray[0]-1; i<(spaceArray.length+spaceArray[0]-1); i++){
          var turnThisSpaceBlue;
          if (everything[i].space==occupied){
            turnThisSpaceBlue=i;
          };
          if (everything[i].open == "TRUE" && everything[i] != "null"){     // green
            document.getElementById(everything[i].id).style.backgroundColor = "#41ae76";
            document.getElementById(everything[i].id).disabled = false;
          }
          else if (everything[i].open == "FALSE"){   // red
            document.getElementById(everything[i].id).style.backgroundColor = "#ef3b2c";
            document.getElementById(everything[i].id).disabled = true;
          };
          console.log(document.getElementById(everything[i].id));
        };
        //change checkedin space to blue
        if (everything[turnThisSpaceBlue].space==occupied){
          console.log("refreshing checked in button");
          console.log(everything);
          console.log(document.getElementById(everything[turnThisSpaceBlue].id));
          document.getElementById(everything[turnThisSpaceBlue].id).style.backgroundColor = "#0B0947";
        };
        if (occupied !=""){
          for (i=spaceArray[0]-1; i<(spaceArray.length+spaceArray[0]-1); i++){
            document.getElementById(everything[i].id).disabled=true;
          };
        };
      });
      return deferred.promise;
    },
    setFloor: function(data){
      console.log(data);
      floorID = data;
      console.log(floorID);
    },
    setStatus: function(){ //Checks to see if a space is occupied, then sets the response to display on status page
      var status;
      if (occupied != ""){
        status="checked in";
      }else{
        status = "Not checked in"
      };
      console.log(status);
      return status;
    },
    keepCount: function(){
      return checkinCount;
    }
  };


  return ret;
}])

.factory('Chats', function() {

  var chats = [{
    id: 0,
    name: 'Armstrong Floor 1',
    //lastText: '2',
    face: 'img/AL1Outline.png'
  }, {
    id: 1,
    name: 'Armstrong Floor 2',
    face: 'img/AL2Outline.png'
  }, {
    id: 2,
    name: 'Bihall Floor 2',
    face: 'img/F2Outline.png'
  }, {
    id: 3,
    name: 'Bihall Floor 3',
    face: 'img/F3Outline.png'
  }, {
    id: 4,
    name: 'Bihall Floor 4',
    face: 'img/F4Outline.png'
  }, {
    id: 5,
    name: 'Bihall Floor 5',
    face: 'img/F5Outline.png'
  }, {
    id: 6,
    name: 'Bihall Floor 6',
    face: 'img/F6Outline.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
