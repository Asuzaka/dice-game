const crypto = require("crypto");

const SIZE_BYTES = 32; // 256 bits
const HMAC_ALGORITHM = "sha3-256";
const DIGEST_METHOD = "hex";

// Fair random values
class SecureRandomGeneration {
  // Random secure key
  static generateKey() {
    return crypto.randomBytes(SIZE_BYTES);
  }

  // Comp choice
  static GenerateNumber(max) {
    return crypto.randomInt(0, max + 1);
  }

  // HMAC
  static calculateHmac(key, message) {
    const hmac = crypto.createHmac(HMAC_ALGORITHM, key);
    hmac.update(message.toString());
    return hmac.digest(DIGEST_METHOD);
  }
}

module.exports = { SecureRandomGeneration };
