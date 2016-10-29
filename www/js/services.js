angular.module('starter.services', [])

.service('checkin', ['$q', '$http', function($q, $http){
  var api_url= 'https://sheetsu.com/apis/v1.0/73e7d27138f0';

  var currentID = 1;

  var ret={
    all: function(){
      var deferred = $q.defer();

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
    }
  };

  return ret;
}])


.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Floor 2',
    //face: 'img/F4Outline.png'
  }, {
    id: 1,
    name: 'Floor 3',
    //lastText: 'Hey, it\'s me',
    face: 'img/ionic.png'
  }, {
    id: 2,
    name: 'Floor 4',
    face: 'img/F4Outline.png'
  }, {
    id: 3,
    name: 'Floor 5'
  }, {
    id: 4,
    name: 'Floor 6'
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
