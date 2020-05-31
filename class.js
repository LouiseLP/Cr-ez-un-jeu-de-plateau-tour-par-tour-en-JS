class Positionnable {
  constructor(position) {
    this.position = position;
  }
  get x() {
    return this.position && this.position.x;
  }
  get y() {
    return this.position && this.position.y;
  }
}

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Case extends Positionnable {
  constructor(position, isAccessible = true) {
    super(position);
    this.position = position;
    this.isAccessible = isAccessible;
  }

  setInaccessible() {
    this.isAccessible = false;
  }
}

class Character extends Positionnable {
  constructor({ position, weapon, pv, name = "John Doe" }) {
    super(position);
    this.position = position;
    this.name = name;
    this.pv = pv;
    this.weaponDefault = weapon;
  }

  moveDown() {
    this.position.y += 1;
  }
  moveUp() {
    this.position.y -= 1;
  }
  moveLeft() {
    this.position.x -= 1;
  }
  moveRight() {
    this.position.x += 1;
  }
}

class Weapon extends Positionnable {
  constructor({ name, degats, position }) {
    super(position);
    this.name = name;
    this.degats = degats;
    this.position = position;
  }
  setProperty({ name, degats }) {
    this.name = name;
    this.degats = degats;
  }
}

export { Positionnable, Position, Case, Character, Weapon };
