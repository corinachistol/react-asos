import {Outlet} from "react-router-dom";

export default function WomenLayout() {
    return (
        <div className="women-layout">
            <h2>Women</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda facilis animi necessitatibus, dolores reprehenderit tempore ea deserunt veniam nihil quod delectus atque, placeat autem? Hic assumenda soluta suscipit eum distinctio.</p>

            <Outlet/>
        </div>
    )
}