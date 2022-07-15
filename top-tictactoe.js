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
        let cellsPlayed = [];
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
        const resetCellsPlayed = () => {
            cellsPlayed = [];
        }
        return {addMark, getName, checkWin, getWinningCells, resetCellsPlayed};
    };

    const playerOne = Player("Player One", "x");
    const playerTwo = Player("Player Two", "o");
    
    const resetBoard = () => {
        for (i = 0; i < board.length; i++) {
            board[i] = "";
        }
        playerOne.resetCellsPlayed();
        playerTwo.resetCellsPlayed();
    }

    return {board, playerOne, playerTwo, resetBoard};

})();

const displayController = (() => {

    let turn = 0;
    let currentTurn = gameBoard.playerOne;
    
    const gameBoardDiv = document.getElementById("gameboard");
    const gameBoardCells = document.getElementsByClassName("gamecell");
    const gameOver = document.getElementById("game-end");
    const gameResult = document.getElementById("game-result");
    const resetBtn = document.getElementById("game-reset");

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
        if (currentTurn.checkWin()) {
            highlightWin(currentTurn.getWinningCells());
            for (i = 0; i < gameBoardCells.length; i++) {
                gameBoardCells[i].removeEventListener("click", displayMark);
                gameBoardCells[i].classList.remove("open");
                gameBoardCells[i].classList.add("closed");
            }
            gameEnd();
        } else if (turn == 9) {
            showTie();
            gameEnd();
        } else {
            // CONTINUE
            changeTurn();
        }
    }

    const highlightWin = (cells) => {
        cells.forEach( 
            cell => {
                gameBoardCells[cell].classList.add("win");
            }
        );
        gameResult.innerText = `${currentTurn.getName()} wins!`;
    }

    const showTie = () => {
        gameResult.innerText = "The game was a tie."
    }

    const changeTurn = () => {
        if (currentTurn == gameBoard.playerOne) {
            currentTurn = gameBoard.playerTwo;
        } else {
            currentTurn = gameBoard.playerOne;
        }
    }

    const gameEnd = () => {
        gameOver.style.visibility = "visible";
    }

    const resetGame = () => {
        for (i = 0; i < gameBoardCells.length; i++) {
            let mark = gameBoardCells[i].querySelector("div");
            if (mark != null) {
                mark.remove();
            }
            gameBoardCells[i].classList = "gamecell open";
            gameBoardCells[i].addEventListener("click", displayMark);
        }
        turn = 0;
        currentTurn = gameBoard.playerOne;
        gameBoard.resetBoard();
        gameOver.style.visibility = "hidden";
    }

    resetBtn.addEventListener("click", resetGame);

    return {resetGame}

})();