# 🎲 Hashed Dice Game (CLI Version)

This is a command-line dice game where two players (you and the computer) each select a custom die (with 6 faces), roll it using a fair HMAC-based number generation method, and compare results to determine the winner.

---

## ▶️ How to Start

Run the game with dice sets as arguments:

```bash
node start.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3
```

## 🔐 Fairness

All random values are generated **before** user input and committed with **HMACs** using a secret key. After user input, the key is revealed for verification.

You can verify:

- `HMAC = HMAC_SHA256(secretKey, number)`
- Ensures the game can’t cheat by changing numbers after seeing your input.

---

## ▶️ Gameplay

[![Watch the video](https://img.youtube.com/vi/_IOe06N6xII/0.jpg)](https://www.youtube.com/watch?v=_IOe06N6xII)
