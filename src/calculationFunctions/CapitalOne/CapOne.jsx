import CapOneAcc from "./CapOneAcc";
import CapOneCC from "./CapOneCC";

export default function CapOne(file) {
  //CC Statement ELSE Bank Statement
  //CC has debit/credit while account statement has only transaction as column
  //Could also filter by file name but that requires more work from user
  console.log(file);
  if (file.data[0].Debit) {
    return CapOneCC(file);
  }
  return CapOneAcc(file);
}
