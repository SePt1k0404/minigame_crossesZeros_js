let player = "X";
let isWinner = false;

const playerX = [];
const playerO = [];

const combination = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [1, 5, 9],
  [3, 5, 7],
  [3, 6, 9],
];

const contentEl = document.querySelector(".content");

createMarkup();

contentEl.addEventListener("click", handlerPlayerTurn);

// ! Function ______________________

function createMarkup() {
  let itemMarkup = "";
  for (let i = 1; i <= 9; i += 1) {
    itemMarkup += `<div class="item" data-id="${i}"></div>`;
  }
  contentEl.innerHTML = itemMarkup;
}

function handlerPlayerTurn(evt) {
  if (evt.target === evt.currentTarget || evt.target.textContent) {
    return;
  }
  addId(player);
  evt.target.textContent = player;
  if (isWinner) {
    const instance = basicLightbox.create(`
     <div class="box">
        <h1>Player - ${player} is winner</h1>
        <button type="button" class="modal_button">Restart Game</button>
     </div>
        `);
    instance.show();
    instance.element().style.backgroundColor = "pink";
    console.log(
      (instance.element().children[0].children[0].style.backgroundColor =
        "skyblue")
    );
    instance.element().addEventListener("click", (evt) => {
      if (!evt.target.classList.contains("modal_button")) {
        return;
      }
      instance.close();
    });
    resetGame();
    return;
  }

  player = player === "X" ? "O" : "X";
  evt.target.classList.add("fill_item");
  function addId(player) {
    if (player === "X") {
      playerX.push(Number(evt.target.dataset.id));
      isWinner = playerX.length >= 3 ? checkWinner(playerX) : false;
    } else {
      playerO.push(Number(evt.target.dataset.id));
      isWinner = playerO.length >= 3 ? checkWinner(playerO) : false;
    }
  }
}

function checkWinner(arrOfTurns) {
  return combination.some((item) =>
    item.every((id) => arrOfTurns.includes(id))
  );
}

function resetGame() {
  playerO.splice(0);
  playerX.splice(0);
  createMarkup();
  player = "X";
}
