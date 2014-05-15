angular.module('myApp',[])

.controller('playscreenController', ['$scope', 'Cell', '$timeout', function($scope, cellService, $timeout) {
	
	function randomize() {	

		cellService.clearCells();

		$scope.cells = new Array();

		for(var i=0;i<225;i++) {
			cellService.createCell();
		}

		$scope.cells = cellService.getCells();

		$timeout(randomize, 1000);

	};

	randomize();

}])

.factory('Cell', function() {

	var cells = new Array();

    function createCell() {	

		var classes = [];
		var color = '255, 0, 53';
		var backOp = Math.random();
		var bgColor = {"background-color": "rgba(" + color + "," + backOp + ")"};

		cells.push({"classes": classes, "bgColor": bgColor});

	};

	function getCells() {

		return cells;
	
	};

	function clearCells() {

		cells = [];

	};

	return {createCell: createCell, getCells: getCells, clearCells: clearCells};

});