const gameBoard = (() => {
    
    const board = ["","","","","","","","",""];

    const winningConditions = [
        ["0","1","2"],
        ["3","4","5"],
        ["6","7","8"],
        ["0","3","6"],
        ["1","4","7"],
        ["2","5","8"],
        ["0","4","8"],
        ["2","4","6"]
    ];
    
    const Player = (name, mark) => {
        const cellsPlayed = [];
        let winningCells;
        const getWinningCells = () => winningCells;
        const getName = () => name;
        const addMark = (cell) => {
            board[cell] = mark;
            cellsPlayed.push(cell);
        }
        const checkWin = () => {
            let win = false;
            winningConditions.forEach(
                winCondition => {
                    if(winCondition.every(cell => cellsPlayed.includes(cell))) {
                        win = true;
                        winningCells = winCondition;
                    }
                }
            );
            return win;
        }
        return {addMark, getName, checkWin, getWinningCells};
    };

    const playerOne = Player("Player One", "x");
    const playerTwo = Player("Player Two", "o");

    return {board, playerOne, playerTwo};

})();

const displayController = (() => {

    let turn = 0;
    let currentTurn = gameBoard.playerOne;
    
    const gameBoardDiv = document.getElementById("gameboard");
    const gameBoardCells = document.getElementsByClassName("gamecell");

    for (i = 0; i < gameBoardCells.length; i++) {
        gameBoardCells[i].addEventListener("click", displayMark);
    }

    function displayMark() {
        turn++;
        let gameCell = this.getAttribute("game-cell");
        currentTurn.addMark(gameCell);

        let markHTML = document.createElement('div');
        markHTML.classList.add('game-mark');
        markHTML.innerText = gameBoard.board[gameCell];
        this.appendChild(markHTML); 
        
        this.classList.remove("open");
        this.classList.add("closed");
        this.removeEventListener("click", displayMark);
        if (turn == 9) {
            showTie();
        } else if (currentTurn.checkWin()) {
            highlightWin(currentTurn.getWinningCells());
            for (i = 0; i < gameBoardCells.length; i++) {
                gameBoardCells[i].removeEventListener("click", displayMark);
                gameBoardCells[i].classList.remove("open");
                gameBoardCells[i].classList.add("closed");
            }
        } else {
            // CONTINUE
            changeTurn();
        }
    }

    const highlightWin = (cells) => {
        console.log(cells);
        cells.forEach( 
            cell => {
                gameBoardCells[cell].classList.add("win");
            }
        );
    }

    const showTie = () => {
        console.log("TIE");
    }

    const changeTurn = () => {
        if (currentTurn == gameBoard.playerOne) {
            currentTurn = gameBoard.playerTwo;
        } else {
            currentTurn = gameBoard.playerOne;
        }
    }

})();