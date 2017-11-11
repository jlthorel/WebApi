angular.module('myApp')
  .factory('authApiServices', ['$http','$q',function ($http, $q) {
    return {
      search: function(query, page){
        return $http.get("http://localhost:3000/search?q=" + query + "&page=" + page);
    }
  }
  }]);