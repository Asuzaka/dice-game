const { ProbabilityCalculator } = require("./probabiltyCalc");
const AsciiTable = require("ascii-table");

const prompt = require("prompt-sync")();

class Display {
  static InputSync(DICES) {
    let input, number;

    while (true) {
      input = prompt("Your selection:").trim();

      if (input === "?") {
        this.Table(DICES);
      }

      if (input.toLowerCase() === "x") {
        console.log("Exiting the game...");
        process.exit();
      }

      number = Number(input);

      if (input.length > 0 && !isNaN(number)) {
        return number;
      }
    }
  }
  static Text(args) {
    if (typeof args == "object") {
      for (let i = 0; i < args.length; i++) {
        console.log(args[i]);
      }
    } else if (typeof args == "string") {
      console.log(args);
    }
  }
  static DiceOptions(diceArray) {
    console.log("Choose your dice:");
    diceArray.forEach((faces, index) => console.log(`${index} - ${faces}`));
  }

  static HelpOrExit() {
    console.log("x - exit");
    console.log("? - help");
  }
  static MoveOptions(range) {
    for (let i = 0; i < range + 1; i++) {
      console.log(`${i} - ${i}`);
    }
    this.HelpOrExit();
  }
  static Result(player, computer) {
    if (computer > player) {
      console.log(`You loose (${player} < ${computer})`);
    } else if (player > computer) {
      console.log(`You win (${player} < ${computer})`);
    } else {
      console.log(`Tie (${player} = ${computer})`);
    }
  }

  static Table(DICES) {
    const probs = ProbabilityCalculator.calculateWinProbabilities(DICES);
    const table = new AsciiTable("Probability of the win fоr the user:");

    const headerRow = ["user dice v"];
    for (let i = 0; i < DICES.length; i++) {
      headerRow.push(DICES[i].join(","));
    }
    table.setHeading(...headerRow);

    for (let i = 0; i < DICES.length; i++) {
      const row = [DICES[i].join(",")];
      for (let j = 0; j < DICES.length; j++) {
        if (i === j) {
          row.push("- (0.3333)");
        } else {
          row.push(probs[i][j].toFixed(4));
        }
      }
      table.addRow(...row);
    }

    console.log(table.toString());
  }
}

module.exports = { Display };
