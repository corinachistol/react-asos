import {Link} from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="not-found">
            <h2>Page not found</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, hic.</p>

            <p>Go to the <Link to="/">Homepage</Link></p>

        </div>
    )
}