const { FairGeneration } = require("./fairGeneration");
const { Dice } = require("./dice");
const { Display } = require("./display");
const { Message } = require("./message");
const { validate, parse } = require("./diceParser");
const { SecureRandomGeneration } = require("./secureRandomGeneration");

class DiceGameEngine {
  constructor(DICE_CONFIG) {
    this.protocol = new FairGeneration();
    this.diceSets = parse(DICE_CONFIG);
    this.nodeDice = null;
    this.userDice = null;
    this.nodeRoll = 0;
    this.userRoll = 0;
    this.generalRoll = null;
    this.hmac = null;
    this.currentPlayer = null; // 0 - user; 1 - computer
    this.input = null;
  }

  // Main function to start whole engine
  start() {
    validate(this.diceSets);
    this.determineFirstMove();
    this.diceSelection();
    this.diceRoll();
    this.changePlayer();
    this.diceRoll();
    Display.Result(this.userRoll, this.nodeRoll);
  }

  // Determine who is first
  determineFirstMove() {
    this.hmac = this.protocol.initiateRound(1);
    Display.Text([
      Message.entry,
      Message.RANGE_SELECTION(1),
      Message.HMAC_VALUE(this.hmac),
      Message.guess,
    ]);
    Display.MoveOptions(1);
    this.input = Display.InputSync(this.diceSets);
    this.generalRoll = this.protocol.calculateResult(this.input);
    this.currentPlayer = this.generalRoll.result ? 0 : 1;
    Display.Text(Message.MY_SELECTION(this.generalRoll));
  }

  // Select Dices
  diceSelection() {
    Display.Text(Message.MAKE_FIRST_MOVE(this.currentPlayer));
    if (this.currentPlayer == 0) {
      this.diceUser(this.diceSets);
      this.dicePC();
    } else if (this.currentPlayer == 1) {
      this.dicePC();
      this.diceUser(this.diceSets);
    }
  }

  // Roll Dices
  diceRoll() {
    let diceR =
      this.currentPlayer == 0
        ? this.userDice.faces.length - 1
        : this.nodeDice.faces.length - 1;

    this.hmac = this.protocol.initiateRound(diceR);
    Display.Text([
      Message.TIME_ROLL(this.currentPlayer),
      Message.RANGE_SELECTION(diceR),
      Message.HMAC_VALUE(this.hmac),
      Message.MODULO_RANGE(diceR),
    ]);
    Display.MoveOptions(diceR);
    this.input = Display.InputSync(this.diceSets);
    this.generalRoll = this.protocol.calculateResult(this.input, diceR + 1);
    Display.Text([
      Message.MY_NUMBER(this.generalRoll),
      Message.NUMBER_GENERATION(this.generalRoll, this.input, diceR),
    ]);
    this.rollAdd();
    Display.Text(
      Message.ROLL_RESULT(
        this.currentPlayer == 0 ? this.userRoll : this.nodeRoll,
        this.currentPlayer
      )
    );
  }

  rollAdd() {
    if (this.currentPlayer == 0) {
      this.userRoll = this.userDice.roll(this.generalRoll.result);
    } else if (this.currentPlayer == 1) {
      this.nodeRoll = this.nodeDice.roll(this.generalRoll.result);
    }
  }

  changePlayer() {
    this.currentPlayer = this.currentPlayer == 0 ? 1 : 0;
  }

  dicePC() {
    let Selection = SecureRandomGeneration.GenerateNumber(
      this.diceSets.length - 1
    );
    this.nodeDice = new Dice(this.diceSets[Selection]);
    this.diceSets = this.diceSets.filter((_, i) => i !== Selection);
    Display.Text(Message.CHOOSE_DICE(this.nodeDice, 1));
  }
  diceUser(DICES) {
    Display.DiceOptions(this.diceSets);
    this.input = Display.InputSync(DICES);
    this.userDice = new Dice(this.diceSets[this.input]);
    this.diceSets = this.diceSets.filter((_, i) => i !== this.input);
    Display.Text(Message.CHOOSE_DICE(this.userDice, 0));
  }
}

module.exports = { DiceGameEngine };
