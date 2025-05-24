// Dice class
class Dice {
  constructor(faces) {
    this.faces = faces;
  }
  roll(value) {
    return this.faces[value];
  }
}

module.exports = { Dice };
