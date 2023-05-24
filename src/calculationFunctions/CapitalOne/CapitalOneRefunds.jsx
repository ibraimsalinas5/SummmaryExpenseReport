

export default function CapitalOneRefunds(line, refund){
    if(!line.Description.includes("PAYMENT")){
        return refund;
    }
    return 0.00;
}