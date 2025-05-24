class Message {
  static entry = "Let's determine who makes the first move.";
  static guess = "Try to guess my selection.";

  static RANGE_SELECTION(range) {
    return `I selected a random value in the range 0..${range} `;
  }

  static HMAC_VALUE(hmac) {
    return `(HMAC=${hmac}).`;
  }

  static MODULO_RANGE(range) {
    return `Add your number module ${range + 1}`;
  }

  static MY_SELECTION(result) {
    return `My Selection: ${result.computerNumber} (KEY=${result.secretKey})`;
  }

  static MAKE_FIRST_MOVE(n) {
    return `${n == 0 ? "You" : "I"} make the first move`;
  }

  static CHOOSE_DICE(dice, n) {
    return `${n == 0 ? "You" : "I"} choose the ${dice.faces} dice.`;
  }

  static TIME_ROLL(n) {
    return `It's ${n == 0 ? "your" : "my"} time to roll.`;
  }

  static MY_NUMBER(result) {
    return `My result is ${result.computerNumber} (KEY=${result.secretKey})`;
  }

  static NUMBER_GENERATION(result, number, DiceRange) {
    return `The fair number generation result is ${
      result.computerNumber
    } + ${number} = ${result.result} (mod ${DiceRange + 1})`;
  }

  static ROLL_RESULT(Roll, n) {
    return `${n == 0 ? "Your" : "My"} roll result is ${Roll}`;
  }
}

module.exports = { Message };
