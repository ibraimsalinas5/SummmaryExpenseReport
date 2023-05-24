import TotalExepenseCard from "./TotalExpenseCard";
import WagesCard from "./WagesCard";



export default function Cards({totalExpenses}) {
    return(
      <div class = "cards">
       <TotalExepenseCard  totalExpenses={totalExpenses}/> 
       <WagesCard totalExpenses = {totalExpenses} />
      </div>
    )

}