angular.module('starter.services', [])

.service('checkin', ['$q', '$http', function($q, $http){
  var api_url= 'https://sheetsu.com/apis/v1.0/73e7d27138f0';

  var currentID = 1;
  var occupied;

  var ret={
    all: function(){
      var deferred = $q.defer();
      var buttonID= event.srcElement.id;
      $http.get(api_url).then(function(resp){
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
    update: function(data){
      var buttonID= event.srcElement.id;
      var deferred = $q.defer();
      $http.patch(api_url + '/id/' + buttonID, data).then(function(resp){
        deferred.resolve(resp.data);
      });
      return deferred.promise;
    },
    occupy: function(data){
      console.log(data);
      var buttonID= data.id;
      var deferred = $q.defer();
      $http.get(api_url + '/id/'+buttonID).then(function(resp){
        occupied = resp.data[0].space;
        console.log(occupied);
        return deferred.promise;
      });
    },
    out: function(data){
      var deferred = $q.defer();
      console.log(occupied + " occupied");
      data.space = occupied;
      console.log(data.space);
      $http.patch(api_url +'/space/' + occupied, data).then(function(resp){
        occupied = "";
        console.log(occupied);
        deferred.resolve(resp.data);
      });
      console.log(occupied);
      return deferred.promise;
    },
    Refresh: function(data){
      var deferred = $q.defer();
      // console.log(data.$$state.value);
      var d = data.$$state.value;
      //console.log(d);     // prints out list of 27 spaces
      for (i=0; i<d.length; i++){
        console.log(document.getElementById(d[i].id));
        //console.log(angular.element(document.body));
        console.log(d[i].open);
        if (d[i].open == "TRUE"){     // green
          document.getElementById(d[i].id).style.backgroundColor = "#4CAF50";
          console.log(document.getElementById(i));
          console.log("hello");
        }
        else if (d[i].open == "FALSE"){
          document.getElementById(d[i].id).style.backgroundColor = "#E31A1C";
          console.log(document.getElementById(i));
          console.log("goodbye");
        }
      }
      console.log("end loop");
      return deferred.promise;
    }
  };

  return ret;
}])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  var chats = [{
    id: 0,
    name: 'Armstrong Library Floor 1',
    lastText: '2'
  }, {
    id: 1,
    name: 'Armstrong Library Floor 2',
    lastText: '3'
  }, {
    id: 2,
    name: 'Bihall Floor 2',
    lastText: '5',
    face: 'img/F2Outline.png'
  }, {
    id: 3,
    name: 'Bihall Floor 3',
    lastText: '0',
    face: 'img/F3Outline.png'
  }, {
    id: 4,
    name: 'Bihall Floor 4',
    lastText: '2',
    face: 'img/F4Outline.png'
  }, {
    id: 5,
    name: 'Bihall Floor 5',
    lastText: '11',
    face: 'img/F5Outline.png'
  }, {
    id: 6,
    name: 'Bihall Floor 6',
    lastText: '4',
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
