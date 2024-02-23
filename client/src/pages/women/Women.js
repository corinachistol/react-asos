import {useLoaderData, Link} from "react-router-dom";

export default function Women() {
    const womenProducts = useLoaderData()
    const {products} = womenProducts
    
    return (
        <div className="women-products">
           {products.map( product => (
            <Link to={product.id.toString()} key={product.id}>
                <img src="../women_products/img1.jpg" alt={product.name} />
                <p>{product.name}</p>
                <p>Price: {product.price.amount} {product.price.currency}</p>
            </Link>
    
           ))}
        </div>
       
    )
}

//loader function
export const womenProductsLoader = async () => {
    const response = await fetch("http://localhost:3000/products")

    if(response.name == null ){
        throw new Error("Could not fetch the products")
    }
    
    return response.json()
}