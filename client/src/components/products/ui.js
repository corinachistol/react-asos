import { Money } from "../money/ui";

export function Product({productObject:{name,image,price}}) {
    // console.log(name)
    // console.log(image)
    console.log(price)
    return (
        <div>
            <h2>{name}</h2>
            <img src={image} alt={name}/>
            
            <Money key={price.id} priceObject={price}/>
        </div>
    )
}