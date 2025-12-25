const game = new Chess();
let flipped = false;
let setupMode = false;

const boardEl = document.getElementById("board");
const pgnEl = document.getElementById("pgn");
const materialEl = document.getElementById("material");

const pieces = {
  p: "bp", r: "br", n: "bn", b: "bb", q: "bq", k: "bk",
  P: "wp", R: "wr", N: "wn", B: "wb", Q: "wq", K: "wk"
};

function renderBoard() {
  boardEl.innerHTML = "";
  const board = game.board();
  const ranks = flipped ? board : [...board].reverse();

  ranks.forEach((rank, r) => {
    rank.forEach((sq, f) => {
      const square = document.createElement("div");
      const isLight = (r + f) % 2 === 0;
      square.className = `square ${isLight ? "light" : "dark"}`;

      const file = String.fromCharCode(97 + f);
      const rankNum = flipped ? r + 1 : 8 - r;
      square.dataset.square = file + rankNum;

      if (sq) {
        const img = document.createElement("img");
        img.src = `assets/pieces/cburnett/${pieces[sq.type === "p" ? sq.color === "w" ? "P":"p":sq.color==="w"?sq.type.toUpperCase():sq.type]}.svg`;
        square.appendChild(img);
      }

      if (f === 0) {
        square.innerHTML += `<span class="coord rank">${rankNum}</span>`;
      }
      if (rankNum === 1) {
        square.innerHTML += `<span class="coord file">${file}</span>`;
      }

      square.onclick = () => onSquareClick(square.dataset.square);
      boardEl.appendChild(square);
    });
  });

  pgnEl.textContent = game.pgn();
  updateMaterial();
  saveState();
}
