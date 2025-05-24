const { SecureRandomGeneration } = require("./secureRandomGeneration");

class FairGeneration {
  constructor() {
    this.secretKey = null;
    this.computerNumber = null;
    this.hmac = null;
  }

  initiateRound(max) {
    this.secretKey = SecureRandomGeneration.generateKey();
    this.computerNumber = SecureRandomGeneration.GenerateNumber(max);
    this.hmac = SecureRandomGeneration.calculateHmac(
      this.secretKey,
      this.computerNumber
    );
    return this.hmac;
  }

  calculateResult(userNumber, range) {
    const obj = {
      computerNumber: this.computerNumber,
      secretKey: this.secretKey.toString("hex"),
    };
    if (range) {
      return {
        result: (this.computerNumber + userNumber) % range,
        ...obj,
      };
    }
    return {
      result: this.computerNumber == userNumber,
      ...obj,
    };
  }
}

module.exports = { FairGeneration };
