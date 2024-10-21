document.querySelector("html").addEventListener("click", function () {
    //alert("Ouch! Stop poking me!");
});

board = [
    [10, 9, 8, 6, 7, 8, 9, 10],
    [11, 11, 11, 11, 11, 11, 11, 11],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [5, 5, 5, 5, 5, 5, 5, 5],
    [4, 3, 2, 0, 1, 2, 3, 4],
];

boardWidth = 8;
boardHeight = 8;

heldPieceId = -1;

window.onload = function () {
    resetBoard();
};

function resetBoard() {
    boardHtml = generateBoardHTML(boardWidth, boardHeight);

    let chessDiv = document.querySelector(".chess");

    chessDiv.innerHTML =
        '<div class="grid-container" style="grid-template-columns:repeat(' +
        boardWidth +
        ', auto)"></div>';
    document.querySelector(".grid-container").innerHTML = boardHtml;
    document.styleSheets[0].insertRule(
        ".square{ width: calc(min(80vh, 80vw) / " +
            boardWidth +
            ");  height: calc(min(80vh, 80vw) / " +
            boardHeight +
            "); }",
        0
    );

    let squares = document.querySelectorAll(".square");
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener("mousedown", onSquarePressed);
        squares[i].addEventListener("mouseup", onSquareRelease);
        squares[i].squareX = i % boardWidth;
        squares[i].squareY = Math.floor(i / boardWidth);
    }
}

function generateBoardHTML(width, height) {
    let boardHtml = "";
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let darkSquare = (x + y) % 2 > 0;
            let color = darkSquare ? "#86a666" : "#ffffdd";
            boardHtml +=
                '<div class="square" style="background-position:' +
                getPieceBackgroundPos(board[y][x]) +
                "; background-color:" +
                color +
                (board[y][x] == -1 ? "; background-image: none;" : "") +
                '"></div>';
        }
    }
    return boardHtml;
}

function getPieceBackgroundPos(pieceId) {
    x = pieceId % 6;
    y = Math.floor(pieceId / 6);

    return x * 20 + "%" + y * 100 + "%";
}

function onSquarePressed(evt) {
    let x = evt.currentTarget.squareX;
    let y = evt.currentTarget.squareY;
    if (board[y][x] != -1) {
        heldPieceId = board[y][x];
        board[y][x] = -1;
    }
    resetBoard();
}

function onSquareRelease(evt) {
    let x = evt.currentTarget.squareX;
    let y = evt.currentTarget.squareY;
    if (heldPieceId != -1) {
        board[y][x] = heldPieceId;
        heldPieceId = -1;
    }
    resetBoard();
}
