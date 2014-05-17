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

.controller('infoscreenController', ['$scope', 'Pieces', function($scope, piecesService) {

	$scope.cells = piecesService.getPiece();

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
					],

					[
						[1,1,0],
						[1,1,0],
						[0,0,0]
					],

					[
						[0,1,0],
						[1,1,0],
						[1,0,0]
					],

					[
						[1,0,0],
						[1,1,1],
						[0,0,0]
					],

					[
						[0,1,0],
						[0,1,1],
						[0,0,1]
					],

					[
						[0,1,0],
						[0,1,1],
						[0,0,1]
					],

					[
						[0,0,0],
						[1,1,1],
						[1,0,1]
					],

					[
						[0,0,0],
						[0,1,1],
						[0,0,1]
					],

					[
						[0,0,0],
						[1,1,0],
						[1,0,0]
					],

					[
						[0,1,0],
						[0,1,0],
						[0,0,0]
					]
				];

	function copyPiece(piece) {

		var copiedPiece = new Array();

		for(var i=0;i<piece.length;i++) {

			copiedPiece[i] = new Array();

			for (var k=0;k<piece.length;k++) {

				copiedPiece[i][k] = piece[i][k];	

			}

		}

		return copiedPiece;

	}

	function rotate90Degrees(piece,n) {

		for(var j=0;j<n;j++) {

			for(var i=0;i<piece.length;i++) {

				for (var k=i+1;k<piece.length;k++) {

					var tmp = piece[i][k]
					piece[i][k] = piece[k][i]
					piece[k][i] = tmp;	

				}

			}

			for(var i=0;i<(piece.length-1)/2;i++) {

				for (var k=0;k<piece.length;k++) {

					var tmp = piece[k][i];
					piece[k][i] = piece[k][piece.length-1-i];
					piece[k][piece.length-1-i] = tmp;

				}

			}

		}

		return piece;

	}			

	function rotatePiece(piece) {

		var x = Math.floor((Math.random()*4));

		var newpiece = new Array();

		for(var i=0;i<piece.length;i++) {

			newpiece[i] = new Array();

			for (var k=0;k<piece.length;k++) {

				newpiece[i][k] = piece[i][k];	

			}

		}

		if (x==0) {
			return newpiece;
		}
		if (x==1) {

			return rotate90Degrees(newpiece,1);
		}
		if (x==2) {
			return rotate90Degrees(newpiece,2);
		}
		if (x==3) {
			return rotate90Degrees(newpiece,3);
		}

	}			


	function randomizePiece() {

		x = Math.floor((Math.random() * pieces.length));
		
		var piece = rotatePiece(pieces[x]);

		for(var i=0;i<piece.length;i++) {

			selectedPiece[i] = new Array();

			for (var k=0;k<piece.length;k++) {

				selectedPiece[i][k] = piece[i][k];	

			}

		}

	}			

	function getPiece() {

		return selectedPiece;

	}

	return {randomizePiece: randomizePiece, getPiece: getPiece};

});