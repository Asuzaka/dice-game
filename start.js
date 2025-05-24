const { DiceGameEngine } = require("./gameEngine");
const game = new DiceGameEngine(process.argv.slice(2));
game.start();
