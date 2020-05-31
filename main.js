import {GameController} from './GameController.js';
import {EventManager} from "./EventManager";
  
  //Module d'affichage des éléments de jeu
  const DisplayManager = (function({ domSelector }) {
    const appContainer = document.getElementById(domSelector);
    const refreshMyApp = function(_gameManager) {
      if (!_gameManager) {
        return false;
      }
      appContainer.innerHTML = "null";
      appContainer.style.backgroundColor = "#5DC4FE";
      _gameManager.cases.forEach(_case => {
        const myCaseElement = document.createElement("div");
        myCaseElement.setAttribute(
          "class",
          `CaseElement Column${_case.position.x} Line${
            _case.position.y
          } ${!_case.isAccessible && "GRIS"}`
        );
        myCaseElement.style.left = `${50 * _case.position.x}px`;
        myCaseElement.style.top = `${50 * _case.position.y}px`;
        appContainer.append(myCaseElement);
      });
  
      //images joueurs/armes créées en associant le nom de l'élément et ".png"
      const x1 = _gameManager.joueur1.position.x;
      const y1 = _gameManager.joueur1.position.y;
      const caseEl = document.querySelector(`.Column${x1}.Line${y1}`);
      const joueur1Elt = document.createElement("div");
      joueur1Elt.setAttribute("id", "J1");
      caseEl.appendChild(joueur1Elt);
      var img1 = document.createElement("img");
      img1.src = "./Characters/" + _gameManager.joueur1.name + ".png";
      var src = document.getElementById("J1");
      src.appendChild(img1);
  
      const x2 = _gameManager.joueur2.position.x;
      const y2 = _gameManager.joueur2.position.y;
      const caseElt = document.querySelector(`.Column${x2}.Line${y2}`);
      const joueur2Elt = document.createElement("div");
      joueur2Elt.setAttribute("id", "J2");
      caseElt.appendChild(joueur2Elt);
      var img = document.createElement("img");
      img.src = "./Characters/" + _gameManager.joueur2.name + ".png";
      var src = document.getElementById("J2");
      src.appendChild(img);
  
      for (const weapon of _gameManager.weapons) {
        const x = weapon.position.x;
        const y = weapon.position.y;
        const caseElmt = document.querySelector(`.Column${x}.Line${y}`);
        const weaponElt = document.createElement("div");
        weaponElt.setAttribute("id", `${x}${y}`);
        caseElmt.appendChild(weaponElt);
        var img = document.createElement("img");
        img.src = "./Weapons/" + weapon.name + ".png";
        var src = document.getElementById(`${x}${y}`);
        src.appendChild(img);
      }
  
      //Gestion des overlays (overlay de départ et de fin de partie avec un bouton pour recharger la page)
      $("#Start").click(function Hello() {
        $("#overlay").css("display", "none");
      });
      if (_gameManager.joueur1.pv === 0 || _gameManager.joueur2.pv === 0) {
        $("#overlayGameOver").css("display", "block");
      }
      $("#Restart").click(function Bye() {
        return location.reload(true);
      });
  
      //gestion de l'outline du joueur actuel
      if (_gameManager.currentPlayer === _gameManager.joueur1) {
        $("#container1").css("outline", "4px solid #FFFC5F");
        $("#container2").css("outline", "none");
      } else {
        $("#container2").css("outline", "4px solid #FFFC5F");
        $("#container1").css("outline", "none");
      }
  
      //Gestion de l'affichage des infos Joueurs
      $("#joueur1Name").html(_gameManager.joueur1.name);
      $("#joueur2Name").html(_gameManager.joueur2.name);
  
      $("#joueur1Bio").html(
        "Points de vie:" +
          _gameManager.joueur1.pv +
          "<br> Arme:" +
          _gameManager.joueur1.weaponDefault.name +
          "<br> Force:" +
          _gameManager.joueur1.weaponDefault.degats
      );
      $("#pv1").val(_gameManager.joueur1.pv);
  
      $("#joueur2Bio").html(
        "Point de vie:" +
          _gameManager.joueur2.pv +
          "<br> Arme:" +
          _gameManager.joueur2.weaponDefault.name +
          "<br> Force:" +
          _gameManager.joueur2.weaponDefault.degats
      );
      $("#pv2").val(_gameManager.joueur2.pv);
  
      //Gestion boutons d'actions (ils se débloquent lorsque le combat se déclenche)
      if (_gameManager.fighting) {
        $("#container1, #container2").css("background-color", "#D63B3B");
        $("#app").css("opacity", "0.5");
  
        if (_gameManager.currentPlayer === _gameManager.joueur1) {
          $("#AttaquerJ2, #DefendreJ2").prop("disabled", true);
          $("#AttaquerJ1, #DefendreJ1").prop("disabled", false);
        } else if (_gameManager.currentPlayer === _gameManager.joueur2) {
          $("#AttaquerJ1, #DefendreJ1").prop("disabled", true);
          $("#AttaquerJ2, #DefendreJ2").prop("disabled", false);
        }
      }
    };
    return {
      refresh: refreshMyApp
    };
  })({
    domSelector: "app"
  });


  //Module de logique de jeu
  const GameManager = (function({
    size = [10, 10],
    nbWeapons = 3,
    EventManager,
    DisplayManager
  }) {
    if (!EventManager) throw new Error("EventManager est une dépendance");
    if (!DisplayManager) throw new Error("DisplayManager est une dépendance");
  
    const gameController = new GameController({
      size,
      nbWeapons,
      onChange: gc => DisplayManager.refresh(gc)
    });
  
    //fonction appelée lors d'un mouvement vers le haut
    EventManager.onTop(gameController.onTop.bind(gameController));
  
    EventManager.onBottom(gameController.onBottom.bind(gameController));
  
    EventManager.onLeft(gameController.onLeft.bind(gameController));
  
    EventManager.onRight(gameController.onRight.bind(gameController));
  
    EventManager.onSpace(gameController.onSpace.bind(gameController));
  
    EventManager.onAttack(gameController.getAttack.bind(gameController));
  
    EventManager.onDefense(gameController.getDefense.bind(gameController));
  
    DisplayManager.refresh(gameController);
  })({
    nbWeapons: 3,
    size: [10, 10],
    EventManager,
    DisplayManager
  });