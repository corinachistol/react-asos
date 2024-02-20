import { Product } from "./model.js"

export async function getProducts() {
    const response = await fetch("http://localhost:3000/products")
    const products = await response.json()
    console.log(products.products)

   let all_products =  products.products.map( item=>{
        return new Product(item)
    })

    return all_products
}



// getProducts()