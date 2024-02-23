import { useLoaderData,useParams} from "react-router-dom";


export default function WomenProductDetails() {
    const {id} = useParams()
    const products = useLoaderData()
    const {product} = products
    return(
        <div className="product-details">
            <h2>Product Details for {product.name}</h2>
            <img src="../women_products/img1.jpg" alt={product.name} />
            <p>Price {product.price.amount} {product.price.currency}</p>
        </div>
    )
}

//loader fucntion
export const womenProductDetailsLoader = async ({params:{id}}) => {
    const response = await fetch(`http://localhost:3000/products/${id}`)

    if(response.name == null){
        throw new Error("Could not find that product!")
    }
 

    return response.json()
}