var app = angular.module('parkingSlotApp', ['ngMaterial', 'ui.grid']);

app.controller('parkingSlotController', function ($scope, $mdDialog) {

    // Initial Data
 
    $scope.cars = [];
    
    $scope.number = 0000;
    $scope.RamdonAvailableSlot = [];
    //var RamdonAvailableSlot = [];
    $scope.slotNo = 1;
    var colorArray = ['Black','White','Red','Blue'];
    var carNumberPossible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    // Add New car details
    $scope.addCarDetail = function () {
        
        $mdDialog.show({
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            templateUrl: 'AddCarDetail.html',
        })
    };
    var makeCarNumber1 = function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (var i = 0; i < 2; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    var makeCarNumber2 = function(num) {
        var text = "";
        var possible = "0123456789";

        for (var i = 0; i < num; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    $scope.removeItem = function removeItem(row) {
        var index = $scope.cars.indexOf(row);
        if (index !== -1) {
            $scope.RamdonAvailableSlot.push($scope.cars[index].slotNumber);
            $scope.cars.splice(index, 1);
            $scope.refresh();
        }
    };

    $scope.GenerateCarRegistrationNumber = function(noOfSlots, noOfCars){
        
        var slots = parseInt(noOfSlots);
        var cars = parseInt(noOfCars);

        if (slots < cars){
            alert("No of solts should not be greater than no of cars parked!");
            return;
        }
        if (isNaN(slots)|| isNaN(cars)) {
            alert("Inputs are not valid!!");
            return;
        }
        for (var i = 0; i < cars ; i++) {

            $scope.NewCarEntry = {};
            $scope.NewCarEntry.carNumber = makeCarNumber1() + "-" + makeCarNumber2(2) + "-" + makeCarNumber1() + "-" + makeCarNumber2(4);
            var randomNumber = Math.floor(Math.random()*colorArray.length);
            $scope.NewCarEntry.color = colorArray[randomNumber];
            $scope.NewCarEntry.slotNumber = $scope.slotNo;
            $scope.slotNo++;
            $scope.cars.push($scope.NewCarEntry);
            $scope.NewCarEntry = {};
          
        }
        $scope.refresh();
    };

    // End Controller
}


);
app.controller('addCarDetailController', function ($scope, $mdDialog)
{
    $scope.allotSlot = function (carNumber,carColor) {

            $scope.NewCarEntry = {};
            $scope.NewCarEntry.carNumber = carNumber;
            $scope.NewCarEntry.color = carColor;
            if ($scope.RamdonAvailableSlot[0] != null) {
                $scope.NewCarEntry.slotNumber = $scope.RamdonAvailableSlot[0];
                $scope.RamdonAvailableSlot.splice(0, 1);
            }
            else {
                $scope.NewCarEntry.slotNumber = $scope.slotNo;
                $scope.slotNo++;
            }
            $scope.cars.push($scope.NewCarEntry);
            $scope.NewCarEntry = {};
            $mdDialog.hide();
            $scope.refresh();
        
    };
    $scope.cancel = function () {
        $mdDialog.hide();
    };
});