export function Money({ priceObject: {amount,currency} }){
    return (
        <p>{amount} {currency}</p>
    )
}