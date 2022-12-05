const mathSymbols = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

const plus = "/";
const ans = mathSymbols[plus](25, 5);
console.log(ans);
