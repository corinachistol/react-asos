import { Money } from "../money/model"

export class Product{
    constructor( {id,name, image, price} ) {
        this.id = id
        this.name = name
        this.image = image
        this.price = new Money(price.id, price.amount, price.currency)

    }
}
