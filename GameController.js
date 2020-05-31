import { hasard, hasardItem, aleatName } from "./Helper.js";
import { Position, Case, Character, Weapon } from "./class.js";

class GameController {
  constructor({ size, nbWeapons, onChange = () => undefined }) {
    this._runnning = true;
    this.max = size[0];
    this.min = size[1];
    this.nbRows = size[0];
    this.nbCols = size[1];
    this.alreadyExistingObjects = [];
    this.joueur1 = null;
    this.joueur2 = null;
    this.nbWeapons = nbWeapons;
    this.weapons = [];
    this.cases = [];
    this.currentPlayer = null;
    this.awaitingPlayer = null;
    this.fighting = false;
    this.step = 0;
    this.posture = 0;
    this.onChange = onChange;

    this.init();
  }

  running() {
    this._running;
  }

  generateCoordinates() {
    return {
      x: harsard(this.nbCols),
      y: hasard(this.nbRows)
    };
  }

  generateUnaccessibleCases() {
    const max = Math.floor(this.nbCols * this.nbRows * 0.2);
    const min = Math.floor(this.nbCols * this.nbRows * 0.1);
    const nbCases = hasard(max + 1);
    const maxNbCases = nbCases > max ? max : nbCases < min ? min : nbCases;
    for (let i = 0; i < maxNbCases; i++) {
      const hasar = hasardItem(this.cases);
      this.cases[hasar].setInaccessible();
    }
  }

  getAccessibleCases() {
    return this.cases.filter(_case => {
      if (_case.isAccessible === false) {
        return false;
      }
      return !this.alreadyExistingObjects.some(exist => {
        Math.sqrt((exist.x - _case.x) ** 2 + (exist.y - _case.y) ** 2) <= 1;
      });
    });
  }

  getRandomAccessible() {
    return this.getAccessibleCases()[hasardItem(this.getAccessibleCases())];
  }

  createAleatJoueur(weapon) {
    const { x, y } = this.getRandomAccessible().position;
    const name = aleatName.get.call(aleatName);
    return new Character({
      position: new Position(x, y),
      weapon: new Weapon({ ...weapon, position: new Position(x, y) }),
      pv: 100,
      name
    });
  }

  createAleatArme() {
    const { x, y } = this.getRandomAccessible().position;
    const arme = new Weapon({ position: new Position(x, y) });

    const namesArray = ["Bob-omb", "Star", "Fire-flower", "Boo", "Yoshi-Egg"];
    arme.name = namesArray[hasardItem(namesArray)];

    const degatsArray = [20, 20, 30, 30, 40, 50];
    arme.degats = degatsArray[hasardItem(degatsArray)];
    return arme;
  }

  switchPlayer() {
    if (this.currentPlayer === this.joueur1) {
      return (this.currentPlayer = this.joueur2);
    } else if (this.currentPlayer === this.joueur2) {
      return (this.currentPlayer = this.joueur1);
    }
  }

  getWeaponAt(x, y) {
    const w = this.weapons.find(
      weapon => weapon.position.x === x && weapon.position.y === y
    );
    return w;
  }

  getCaseByPosition(position) {
    return this.cases.find(
      ({ position: { x, y } }) => x === position.x && y === position.y
    );
  }

  nextStep() {
    if (this.arePlayersClose()) {
      this.startFight();
      this.running = false;
    }
    this.step++;
    if (this.step >= 3) {
      this.switchPlayer();
      this.step = 0;
    }
  }

  resetStep() {
    return (this.step = 0);
  }

  arePlayersClose() {
    return (
      (this.joueur1.x - this.joueur2.x) ** 2 +
        (this.joueur1.y - this.joueur2.y) ** 2 ===
      1
    );
  }

  onTop() {
    if (!this.running) return;
    const nextCase = this.getCaseByPosition({
      x: this.currentPlayer.x,
      y: this.currentPlayer.y - 1
    });
    if (nextCase && nextCase.isAccessible) {
      this.currentPlayer.moveUp();
      let weapon = this.getWeaponAt(
        this.currentPlayer.position.x,
        this.currentPlayer.position.y
      );
      if (weapon !== undefined) {
        const newPlayerWeapon = { ...weapon };
        const newWeapon = { ...this.currentPlayer.weaponDefault };
        this.currentPlayer.weaponDefault = newPlayerWeapon;
        weapon.setProperty(newWeapon);
      }
      this.nextStep();
      this.onChange(this);
    }
  }

  onBottom() {
    if (!this.running) return;
    const nextCase = this.getCaseByPosition({
      x: this.currentPlayer.x,
      y: this.currentPlayer.y + 1
    });
    if (nextCase && nextCase.isAccessible) {
      this.currentPlayer.moveDown();

      let weapon = this.getWeaponAt(
        this.currentPlayer.position.x,
        this.currentPlayer.position.y
      );

      if (weapon !== undefined) {
        const newPlayerWeapon = { ...weapon };
        const newWeapon = { ...this.currentPlayer.weaponDefault };
        this.currentPlayer.weaponDefault = newPlayerWeapon;
        weapon.setProperty(newWeapon);
      }
      this.nextStep();
      this.onChange(this);
    }
  }

  onLeft() {
    if (!this.running) return;
    const nextCase = this.getCaseByPosition({
      x: this.currentPlayer.x - 1,
      y: this.currentPlayer.y
    });
    if (nextCase && nextCase.isAccessible) {
      this.currentPlayer.moveLeft();

      let weapon = this.getWeaponAt(
        this.currentPlayer.position.x,
        this.currentPlayer.position.y
      );

      if (weapon !== undefined) {
        const newPlayerWeapon = { ...weapon };
        const newWeapon = { ...this.currentPlayer.weaponDefault };
        this.currentPlayer.weaponDefault = newPlayerWeapon;
        weapon.setProperty(newWeapon);
      }
      this.nextStep();
      this.onChange(this);
    }
  }

  onRight() {
    if (!this.running) return;
    const nextCase = this.getCaseByPosition({
      x: this.currentPlayer.x + 1,
      y: this.currentPlayer.y
    });
    if (nextCase && nextCase.isAccessible) {
      this.currentPlayer.moveRight();

      let weapon = this.getWeaponAt(
        this.currentPlayer.position.x,
        this.currentPlayer.position.y
      );

      if (weapon !== undefined) {
        const newPlayerWeapon = { ...weapon };
        const newWeapon = { ...this.currentPlayer.weaponDefault };
        this.currentPlayer.weaponDefault = newPlayerWeapon;
        weapon.setProperty(newWeapon);
      }
      this.nextStep();
      this.onChange(this);
    }
  }

  onSpace() {
    if (!this.running) return;
    this.resetStep();
    this.switchPlayer();
    this.onChange(this);
  }

  startFight() {
    this.fighting = true;
  }

  result0() {
    if (this.joueur1.pv < 0) {
      return (this.joueur1.pv = 0);
    } else if (this.joueur2.pv < 0) {
      return (this.joueur2.pv = 0);
    }
  }

  getAttack() {
    let cible = null;
    if (this.currentPlayer === this.joueur1) {
      cible = this.joueur2;
    } else if (this.currentPlayer === this.joueur2) {
      cible = this.joueur1;
    }

    if (this.currentPlayer.pv > 0 && cible.pv > 0) {
      if (this.posture === 0) {
        cible.pv -= this.currentPlayer.weaponDefault.degats;
      } else if (this.posture === 1) {
        cible.pv -= this.currentPlayer.weaponDefault.degats / 2;
        this.posture = 0;
        this.currentPlayer.weaponDefault.degats * 2;
      }
      this.result0();
      this.switchPlayer();
      this.onChange(this);
    }
  }

  getDefense() {
    if (this.joueur1.pv > 0 && this.joueur2.pv > 0) {
      this.posture = 1;
      this.switchPlayer();
      this.onChange(this);
    }
  }

  // Intialisation du Game Manager
  init() {
    // Génère les cases
    for (let i = 0; i < this.nbRows; i++) {
      for (let a = 0; a < this.nbRows; a++) {
        this.cases.push(new Case(new Position(a, i)));
      }
    }
    // rend aléatoirement certaines cases inaccessibles
    this.generateUnaccessibleCases.bind(this)();

    for (let i = 0; i < this.nbWeapons; i++) {
      const weapon = this.createAleatArme();
      this.alreadyExistingObjects.push(weapon);
      this.weapons.push(weapon);
    }

    this.joueur1 = this.createAleatJoueur({
      name: "Red-Shell",
      degats: 10
    });

    this.joueur2 = this.createAleatJoueur({
      name: "Banana",
      degats: 10
    });

    this.alreadyExistingObjects.push(this.joueur1, this.joueur2);

    if (hasard(10) > 5) {
      this.currentPlayer = this.joueur1;
      this.awaitingPlayer = this.joueur2;
    } else {
      this.currentPlayer = this.joueur2;
      this.awaitingPlayer = this.joueur1;
    }
  }
}

export { GameController };
