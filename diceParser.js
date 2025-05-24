// Dice parser
class DiceParser {
  static parse(input) {
    return input.map((i) => i.split(",").map(Number));
  }

  static validate(config) {
    if (config.length < 3) {
      console.log("Minimal dices quanity is 3!");
      process.exit();
    }

    const checks = config.map((faces) => {
      return faces.every((face) => Number.isInteger(face));
    });

    if (!checks.every((dice) => dice == true)) {
      console.log("All of the faces should be a number");
      process.exit();
    }
  }
}

module.exports = DiceParser;
