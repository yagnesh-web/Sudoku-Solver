
var numSelected = null;
var numSelected1=0;
var tileSelected = null;

var errors = 0;

var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i.toString() + '-' + j.toString());

	}
}

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}
			else
				arr[i][j].innerText = ''
		}
	}
}

var board = [[0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0]]
var Solution = [[0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0]]

// var solution = [[], [], [], [], [], [], [], [], []]

window.onload = function() {
    setGame();
}

function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != 0) {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            arr[i][j] = document.getElementById(i.toString() + '-' + j.toString());
        }
    }
let Easy = document.getElementById('easy')
let Medium = document.getElementById('medium')
let Hard = document.getElementById('hard')
let Random = document.getElementById('random')
let Clear = document.getElementById('clear')
let SolvePuzzle = document.getElementById('SolvePuzzle')

Clear.onclick=function(){
	for(var i=0;i<9;i++)
		{
			for(var j=0;j<9;j++)
				{
                    if(board[i][j]!=0)
					arr[i][j].innerText=board[i][j].toString()
                    else
                    arr[i][j].innerText=''
                    arr[i][j].classList.remove("wrong")
				}
		}
        if(numSelected1==-1)
        FillBoard(Solution)
}

Easy.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}
Medium.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=medium')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}
Hard.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=hard')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}
Random.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=random')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	sudukoSolver(board,0,0,9);
    for(var i=0;i<9;i++)
        {
            for(var j=0;j<9;j++)
                {
                    arr[i][j].classList.remove("wrong")
                }
        }
        numSelected1=-1;
}
}

function selectNumber(){
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected1 = parseInt(this.innerText);
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    let coords = this.id.split("-"); //["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    if (numSelected) {
        if (this.innerText != "" && board[r][c]!=0) {
            return;
        }

        // "0-0" "0-1" .. "3-1"

        if (isSafe(board,r,c,numSelected1,9)) {
            this.innerText = numSelected.id;
            this.classList.remove("wrong");
        }
        else {
            errors += 1;
            this.innerText = numSelected.id;
            this.classList.add("wrong");
            document.getElementById("errors").innerText = errors;
        }
    }
}

function isSafe(solution,row,col,val,n) {
	for (let i = 0; i<n; i++) {
	  if (solution[row][i] == val || solution[i][col]==val)
		return false;
	}
	let rn=Math.sqrt(n);
	let si= row-row%rn;
	let sj= col-col%rn;
	for(let x=si; x<si+rn; x++){
		for(let y=sj; y<sj+rn; y++){
			if(solution[x][y]==val){
				return false;
			}
		}
	}
	return true;
  }

function sudukoSolver(solution,row,col,n) {
	// base case
	if (row == n) {
	  FillBoard(solution)
	  return true;
	}
	// if we at last col
	if (col == n) {
	  return sudukoSolver(solution, row + 1, 0, n);
	}
	// if cell is already filled
	if (solution[row][col] != 0) {
	  return sudukoSolver(solution, row, col + 1, n);
	}
	for (let val = 1; val <= 9; val++) {
	  // check val is safe or not?
	  if (isSafe(solution, row, col, val, n)) {
		solution[row][col] = val;
		// recursive call
		let ifpossible = sudukoSolver(solution, row, col + 1, n);
		if (ifpossible) {
		  return true;
		}
		// backtracking
		solution[row][col] = 0;
	  }
	}
	return false;
  }