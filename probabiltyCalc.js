class ProbabilityCalculator {
  static calculateWinProbabilities(diceSets) {
    const n = diceSets.length;
    const probabilities = Array(n)
      .fill(null)
      .map(() => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === j) {
          probabilities[i][j] = 0.3333;
          continue;
        }

        let wins = 0;
        let total = 0;
        for (const a of diceSets[i]) {
          for (const b of diceSets[j]) {
            if (a > b) wins++;
            total++;
          }
        }

        probabilities[i][j] = wins / total;
      }
    }

    return probabilities;
  }
}

module.exports = { ProbabilityCalculator };
