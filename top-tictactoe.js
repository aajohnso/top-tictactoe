const gameBoard = (() => {
    
    const board = ["","","","","","","","",""];
    
    const Player = (name, mark) => {
        const addMark = (cell) => {
            board[cell] = mark;
        }
        return {addMark};
    };

    const playerOne = Player("Player One", "x");
    const playerTwo = Player("Player Two", "o");

    playerOne.addMark(0);
    playerOne.addMark(1);
    playerTwo.addMark(2);
    playerTwo.addMark(3);
    playerTwo.addMark(4);
    playerOne.addMark(5);
    playerOne.addMark(6);
    playerTwo.addMark(7);
    playerOne.addMark(8);

    return {board};

})();

const displayController = (() => {

    const gameBoardDiv = document.getElementById("gameboard");
    const gameBoardCells = document.getElementsByClassName("gamecell");

    for (i = 0; i < gameBoard.board.length; i++) {
        gameBoardCells[i].innerText = gameBoard.board[i];
    }

    console.log(gameBoard.board);

})();