const gameBoard = (() => {
    
    const board = ["","","","","","","","",""];
    
    const Player = (name, mark) => {
        const getName = () => name;
        const addMark = (cell) => {
            board[cell] = mark;
        }
        return {addMark, getName};
    };

    const playerOne = Player("Player One", "x");
    const playerTwo = Player("Player Two", "o");

    return {board, playerOne, playerTwo};

})();

const displayController = (() => {

    let currentTurn = gameBoard.playerOne;
    
    const gameBoardDiv = document.getElementById("gameboard");
    const gameBoardCells = document.getElementsByClassName("gamecell");

    for (i = 0; i < gameBoardCells.length; i++) {
        gameBoardCells[i].addEventListener("click", function(){
            let gameCell = this.getAttribute("game-cell");
            currentTurn.addMark(gameCell);
            this.innerText = gameBoard.board[gameCell];
            changeTurn();
        });
    }

    const changeTurn = () => {
        if (currentTurn == gameBoard.playerOne) {
            currentTurn = gameBoard.playerTwo;
        } else {
            currentTurn = gameBoard.playerOne;
        }
    }

})();