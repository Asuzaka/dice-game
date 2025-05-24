const crypto = require("crypto");

// Fair random values
class SecureRandomGeneration {
  // Random secure key
  static generateKey() {
    return crypto.randomBytes(32); // 256 bits
  }

  // Comp choice
  static GenerateNumber(max) {
    return Math.floor(Math.random() * (max + 1));
  }

  // HMAC
  static calculateHmac(key, message) {
    const hmac = crypto.createHmac("sha3-256", key);
    hmac.update(message.toString());
    return hmac.digest("hex");
  }
}

module.exports = { SecureRandomGeneration };
