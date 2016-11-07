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
    }
  };

  return ret;
}])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Bihall Floor 2',
    lastText: '2',
    face: 'img/F2Outline.png'
  }, {
    id: 1,
    name: 'Bihall Floor 3',
    lastText: '3',
    face: 'img/F3Outline.png'
  }, {
    id: 2,
    name: 'Bihall Floor 4',
    lastText: '5',
    face: 'img/F4Outline.png'
  }, {
    id: 3,
    name: 'Bihall Floor 5',
    lastText: '0',
    face: 'img/F5Outline.png'
  }, {
    id: 4,
    name: 'Bihall Floor 6',
    lastText: '2',
    face: 'img/F6Outline.png'
  }, {
    id: 5,
    name: 'Armstrong Library Floor 1',
    lastText: '11'
  }, {
    id: 6,
    name: 'Armstrong Library Floor 2',
    lastText: '4'
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
