//Helpers
const hasard = size => Math.round(Math.random() * size);
const hasardItem = items => hasard(items.length - 1);

//aleatName empêche les deux personnages d'avoir le même nom et donc le même visuel
const aleatName = {
  names: ["Kirby", "Mario", "Toad", "Luigi", "Mario-coon", "Yoshi", "Bowser"],
  get() {
    const hasard = Math.floor(Math.random() * this.names.length);
    const hasardName = this.names[hasard];
    this.names = this.names.filter(name => hasardName !== name);
    return hasardName;
  }
};

export { hasard, hasardItem, aleatName };
