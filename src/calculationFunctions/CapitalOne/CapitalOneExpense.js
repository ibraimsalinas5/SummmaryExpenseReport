export default function CapitalOneExpnese(line, expense) {
  if (!line.TransactionDescription.includes("CAPITAL ONE MOBILE PMT")) {
    return expense;
  }
  return 0.0;
}
