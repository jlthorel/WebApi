angular.module('myApp')
  .factory('authApiServiProductss', ['$http','$q',function ($http, $q) {
    return {
      search: function(query, page){
        return $http.get("http://localhost:3000/search?q=" + query + "&page=" + page);
    }
  }
  }]);