import {Link, useRouteError} from "react-router-dom";

export default function ProductError() {
    const error = useRouteError()
    console.log(error)
    return(
        <div className="product-error">
            <h2>Error</h2>
            <p>{error.message}</p>
            <Link to="/women">Back to the homepage</Link>
        </div>
    )
}