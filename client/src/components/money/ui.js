export function Money({ priceObject }){
    console.log(priceObject)
    // console.log(currency)
    // console.log(id)
    return (
        <p>{priceObject.amount} {priceObject.currency}</p>
    )
}