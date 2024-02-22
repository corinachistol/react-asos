import {useLoaderData, Link} from "react-router-dom";

export default function Women() {
    const womenProducts = useLoaderData()
    const {products} = womenProducts
    
    return (
        <div className="women">
           {products.map( product => (
            <Link to="/" key={product.id}>
                <p>{product.title}</p>
                <img src={product.image} alt={product.name} />
                <p>Price: {product.price.amount} {product.price.currency}</p>
            </Link>
           ))}
        </div>
       
    )
}

//loader function
export const womenProductsLoader = async () => {
    const response = await fetch("http://localhost:3000/products")
    
    return response.json()
}