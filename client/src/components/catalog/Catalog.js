import { useState,useEffect } from "react"
import { getProducts } from "../products/api"
import { Product } from "../products/ui.js"


export function Catalog() {

    const [catalog,setCatalog] = useState([])

    useEffect( () => {
        const loadProducts = async () => {
            const products = await getProducts()
            console.log(products)
            setCatalog(products)
        }
        loadProducts()
    },[])

    return (
        <ol>
            {catalog && catalog.map(product => {
                <li>
                    <Product key={product.id} productObject={product}  />
                </li>
            })}
        </ol>
    )
}