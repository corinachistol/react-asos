import { Product } from "./model"

export async function getProducts() {
    const response = await fetch("http://localhost:3000/")
    const products = await response.json()

    return products.map( item=>{
        return new Product
    })
}