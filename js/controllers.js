angular.module('myApp',[])

.controller('playscreenController', ['$scope', 'Cell',  function($scope, cellService) {
	
	$scope.addColector = function(index1,index2) {

		cellService.addColector(index1,index2);

	}

	$scope.cells = cellService.generateCells(7,7);

}])

.factory('Cell', function() {

	var cells = new Array();

	function generateCells(x,y) {

		cells = [];

		for(var i=0;i<y;i++) {
			
			var cellrow = new Array();
			cells.push(cellrow);
			
			for(var k=0;k<x;k++) {
				
				var classes = [];
				var color = '255, 0, 53';
				var backOp = Math.round(Math.random()*100)/100;
				var bgColor = {"background-color": "rgba(" + color + "," + backOp + ")"};
				cells[i].push({"classes": classes, "bgColor": bgColor, "colector": false, "price": backOp*500})
			
			}
		}

		return cells;

	}

	function addColector(index1,index2) {

		cells[index1][index2].colector = true;

	}

	return {generateCells: generateCells, addColector: addColector};

});