const App = {
  // all of our sselected html elements
  $: {
    menu: document.querySelector('[data-id="menu"]'),
    menuItems: document.querySelector('[data-id="menu-items"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
    squares: document.querySelectorAll('[data-id="square"]'),
    modal: document.querySelector('[data-id="modal"]'),
    modalText: document.querySelector('[data-id="modal-text"]'),
    modalBtn: document.querySelector('[data-id="modal-button"]'),
    turn: document.querySelector('[data-id="turn"]'),
    turnP: document.querySelector('[data-id="turn-p"]'),
    turnIcon: document.querySelector('[data-id="turn-icon"]'),
  },

  state: {
    moves: [],
  },

  getGameStatus(moves) {
    const p1Moves = moves
      .filter((move) => move.playerId === 1)
      .map((move) => +move.squareId);
    const p2Moves = moves
      .filter((move) => move.playerId === 2)
      .map((move) => +move.squareId);

    const winningPatterns = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 5, 9],
      [3, 5, 7],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ];

    let winner = null;
    winningPatterns.forEach((pattern) => {
      const p1wins = pattern.every((v) => p1Moves.includes(v));
      const p2wins = pattern.every((v) => p2Moves.includes(v));
      if (p1wins) winner = 1;
      if (p2wins) winner = 2;
    });

    return {
      status: moves.length === 9 || winner != null ? "complete" : "in progress", //in progres | complete
      winner, //1 or 2 or tie
    };
  },

  init() {
    App.registerEventListeners();
  },
  registerEventListeners() {
    // toggling the menu
    App.$.menu.addEventListener("click", (event) => {
      App.$.menuItems.classList.toggle("hidden");
    });

    // reset the game
    App.$.resetBtn.addEventListener("click", (event) => {
      console.log("reset game");
    });

    // new round
    App.$.newRoundBtn.addEventListener("click", (event) => {
      console.log("new round");
    });

    App.$.modalBtn.addEventListener("click", (event) => {
      App.state.moves = [];
      App.$.squares.forEach((square) => square.replaceChildren());
      App.$.modal.classList.add("hidden");
    });

    // for each square
    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        // check if there is already a play, if so, return early
        const hasMove = (squareId) => {
          const existingMove = App.state.moves.find(
            (move) => move.squareId === squareId
          );
          return existingMove !== undefined;
        };
        // check if there is already an icon in the square
        if (hasMove(+square.id)) {
          return;
        }

        // determine which player icon to add to square
        const lastMove = App.state.moves.at(-1);
        const getOppositePlayer = (playerId) => (playerId === 1 ? 2 : 1);
        const currentPlayer =
          App.state.moves.length === 0
            ? 1
            : getOppositePlayer(lastMove.playerId);
        const nextPlayer = getOppositePlayer(currentPlayer);
        const icon = document.createElement("i");
        const squareIcon = document.createElement("i");
        const turnIcon = document.createElement("i");
        const turnLabel = document.createElement("p");
        turnLabel.innerText = `Player ${nextPlayer} you are up !`;

        // const turnLabel
        let turnmsg = "";

        if (currentPlayer === 1) {
          squareIcon.classList.add("fa-solid", "fa-x", "yellow");
          turnIcon.classList.add("fa-solid", "fa-o", "turquoise");
          turnLabel.classList = "turquoise";

          // turnmsg = `Player ${nextPlayer} you are up!`;
        } else {
          squareIcon.classList.add("fa-solid", "fa-o", "turquoise");
          turnIcon.classList.add("fa-solid", "fa-x", "yellow");
          turnLabel.classList = "yellow";

          // turnmsg = `Player ${nextPlayer} you are up!`;
        }
        App.$.turn.replaceChildren(turnIcon, turnLabel);
        // App.$.turnP.textContent = turnmsg;
        App.state.moves.push({
          squareId: +square.id,
          playerId: currentPlayer,
        });

        square.replaceChildren(squareIcon);

        // check if there is a winner or tie game
        const game = App.getGameStatus(App.state.moves);
        if (game.status === "complete") {
          App.$.modal.classList.remove("hidden");

          let msg = "";
          if (game.winner) {
            msg = `player ${game.winner} wins!`;
          } else {
            msg = "Tie Game!";
          }
          App.$.modalText.textContent = msg;
        }
      });
    });
  },
};

window.addEventListener("load", App.init);
