export default function sum(a, b) {
  if (
    typeof a === "number" &&
    isFinite(a) &&
    typeof b === "number" &&
    isFinite(b)
  ) {
    return a + b;
  }
  throw new TypeError(`Expected two numbers`);
}
