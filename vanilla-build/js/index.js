const App = {
  // all of our sselected html elements
  $: {
    menu: document.querySelector('[data-id="menu"]'),
    menuItems: document.querySelector('[data-id="menu-items"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
    squares: document.querySelectorAll('[data-id="square"]'),
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
    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        console.log(`square with id ${event.target.id} was clicked`);
        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-x", "yellow");

        event.target.replaceChildren(icon);
      });
    });
  },
};

window.addEventListener("load", App.init);
