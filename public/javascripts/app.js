angular.module('candidate', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.ballot = [];
    $scope.candidates = [];
    $scope.addCandidate = function() {
      if($scope.formContent === '') { return; }
        console.log("In addCandidate with "+$scope.formContent);
        $scope.create({
          name: $scope.formContent,
          votes: 0,
        });
        $scope.formContent = '';
      };
    $scope.vote = function() {
      angular.forEach($scope.candidates, function (val, key) {
        if (val.selected) {
          $scope.doVote(val);
          $scope.ballot.push(val);
        }
      });
    };

    $scope.doVote = function (candidate) {
      return $http.put('/voter/' + candidate._id + '/vote')
            .success(function(data){
              console.log("vote worked");
              candidate.votes += 1;
            });
    }

    $scope.getAllVotes = function() {
      return $http.get('/voter').success(function(data){
        angular.copy(data, $scope.candidates);
      });
    };
    $scope.getAllVotes();

    $scope.create = function(candidate) {
      return $http.post('/voter', candidate).success(function(data){
        $scope.candidates.push(data);
      });
    };
    $scope.delete = function(candidate) {
      $http.delete('/voter/' + candidate._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAllVotes();
    };
  }
]);
