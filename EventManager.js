const EVENTS = {
  ON_TOP: 38,
  ON_LEFT: 37,
  ON_BOTTOM: 40,
  ON_RIGHT: 39,
  ON_SPACE: 32
};

//Module de gestion des events
const EventManager = (function() {
  //Tableaux des events
  const _keyboardListeners = [];
  const _onTop = [];
  const _onBottom = [];
  const _onRight = [];
  const _onLeft = [];
  const _onSpace = [];

  const _onAttack = [];
  const _onDefense = [];

  //boutons d'attaque
  $(".AttackButton").click(evt => {
    _onAttack.forEach(k => {
      k();
    });
  });

  //bouton de défense
  $(".DefenseButton").click(evt => {
    _onDefense.forEach(k => {
      k();
    });
  });

  //events clavier
  window.addEventListener("keydown", evt => {
    const code = evt.keyCode;

    switch (true) {
      case code === EVENTS.ON_BOTTOM:
        _onBottom.forEach(l => {
          l(evt.keyCode);
        });
        break;
      case code === EVENTS.ON_LEFT:
        _onLeft.forEach(l => {
          l(evt.keyCode);
        });
        break;
      case code === EVENTS.ON_RIGHT:
        _onRight.forEach(l => {
          l(evt.keyCode);
        });
        break;
      case code === EVENTS.ON_TOP:
        _onTop.forEach(l => {
          l(evt.keyCode);
        });
        break;
      case code === EVENTS.ON_SPACE:
        _onSpace.forEach(l => {
          l(evt.keyCode);
        });
        break;
    }
  });

  return {
    keyBoardAttach: function(f) {
      _keyboardListeners.push(f);
    },
    onTop: function(f) {
      _onTop.push(f);
    },
    onBottom: function(f) {
      _onBottom.push(f);
    },
    onRight: function(f) {
      _onRight.push(f);
    },
    onLeft: function(f) {
      _onLeft.push(f);
    },
    onSpace: function(f) {
      _onSpace.push(f);
    },
    onAttack: function(k) {
      _onAttack.push(k);
    },
    onDefense: function(k) {
      _onDefense.push(k);
    }
  };
})({});

export { EventManager };
