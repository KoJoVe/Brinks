angular.module('myApp',[])

.controller('playscreenController', ['$scope', 'Cell', 'Pieces',  function($scope, cellService, piecesService) {
	
	$scope.addColector = function(index1,index2) {

		if(cellService.addColector(index1,index2,piece)) {
		
			piecesService.randomizePiece();

		}


	}

	$scope.cells = cellService.generateCells(10,10);
	piece = piecesService.getPiece();
	piecesService.randomizePiece();

}])

.controller('infoscreenController', ['$scope', function($scope) {

	$scope.cells = new Array();

	for(var i=0;i<3;i++) {
		
		var cellrow = new Array();
		$scope.cells.push(cellrow);
		
		for(var k=0;k<3;k++) {
			
			var classes = [];
			var color = '255, 0, 53';
			var backOp = Math.floor((i+k)%2)*0.8 + 0.5;
			var bgColor = {"background-color": "rgba(" + color + "," + backOp + ")"};
			$scope.cells[i].push({"classes": classes, "bgColor": bgColor, "colector": false, "price": backOp*500})
		
		}
	}

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

	function addColector(index1,index2,piece) {

		
		var middle = (piece.length-1)/2;

		if (checkPiece(index1,index2,piece)) {
			for(var i=0;i<piece.length;i++) {

				for (var k=0;k<piece.length;k++) {

					if (piece[i][k]==1) {

						cells[index1-middle+i][index2-middle+k].colector = true;

					}

				}

			}
			return true;
		}

		return false;

	}

	function checkPiece(index1,index2,piece) {

		var middle = (piece.length-1)/2;

		for(var i=0;i<piece.length;i++) {

			for (var k=0;k<piece.length;k++) {

				if(piece[i][k]==1) {

					if ((index1-middle+i)<0) {
						return false;
					}
					if ((index1-middle+i)>cells.length-1) {
						return false;
					}
					if ((index2-middle+k)<0) {
						return false;
					}
					if ((index2-middle+k)>cells[0].length-1) {
						return false;
					}
					if (cells[index1-middle+i][index2-middle+k].colector==true) {
						return false;
					}

				}

			}

		}

		return true;

	}

	return {generateCells: generateCells, addColector: addColector};

})

.factory('Pieces', function() {

	var i = 0;

	var selectedPiece = new Array();

	selectedPiece = [[0,0,0],[0,0,0],[0,0,0]]

	var pieces = [
					
					[
						[0,0,0],
						[0,1,0],
						[0,0,0]					
					],

					[
						[0,1,0],
						[1,1,1],
						[0,1,0]
					],
					
					[
						[0,0,0],
						[1,1,1],
						[0,0,0]
					],

					[
						[1,0,0],
						[1,1,0],
						[1,0,0]
					],

					[
						[0,0,1],
						[1,1,1],
						[0,0,0]
					]
				];


	function randomizePiece() {

		x = Math.floor((Math.random() * pieces.length));
		
		for(var i=0;i<piece.length;i++) {

			for (var k=0;k<piece.length;k++) {

				selectedPiece[i][k] = pieces[x][i][k];	

			}

		}


	}			

	function getPiece() {

		return selectedPiece;

	}

	return {randomizePiece: randomizePiece, getPiece: getPiece};

});