document.querySelector("html").addEventListener("click", function () {
    //alert("Ouch! Stop poking me!");
});

window.onload = function () {
    const boardWidth = 8;
    const boardHeight = 8;

    boardHtml = generateBoardHTML(boardWidth, boardHeight);

    var chessDiv = document.querySelector(".chess");

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
};

function generateBoardHTML(width, height) {
    var boardHtml = "";
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            var darkSquare = (x + y) % 2 > 0;
            var color = darkSquare ? "#86a666" : "#ffffdd";
            boardHtml +=
                '<div class="square" style="background-color:' +
                color +
                '"></div>';
        }
    }
    return boardHtml;
}
