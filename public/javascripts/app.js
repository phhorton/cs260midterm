angular.module('item', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.orderedItems = [];
    $scope.allSelected = [];
    $scope.addItem = function() {
      if($scope.itemName === '' || $scope.itemPrice === '' || $scope.itemPict === '') { return; }
        console.log("In addItem with "+$scope.itemName);
        $scope.create({
          name: $scope.itemName,
          price: $scope.itemPrice,
          ordered: 0,
	  pict: $scope.itemPict
        });
        $scope.itemName = '';
	$scope.itemPrice = '';
	$scope.itemPict = '';
      };
    $scope.order = function() {
      $scope.orderedItems = [];
      angular.forEach($scope.allSelected, function (val, key) {
        if (val.selected) {
          $scope.doOrder(val);
          $scope.orderedItems.push(val);
        }
      });
    };

    $scope.doOrder = function (item) {
      return $http.put('/customer/' + item._id + '/order')
            .success(function(data){
              console.log("order worked");
              item.ordered += 1;
            });
    }

    $scope.getAll = function() {
      return $http.get('/customer').success(function(data){
        angular.copy(data, $scope.allSelected);
      });
    };
    $scope.getAll();

    $scope.create = function(item) {
      return $http.post('/customer', item).success(function(data){
        $scope.allSelected.push(data);
      });
    };
    $scope.delete = function(item) {
      $http.delete('/customer/' + item._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };
  }
]);
