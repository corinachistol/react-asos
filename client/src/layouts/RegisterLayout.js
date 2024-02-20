import { NavLink,Outlet,useLocation} from "react-router-dom"
import Logo from "../components/Logo/Logo"
import './style.scss';
import { useState } from "react";
import { Search } from "../components/Search";

export default function RegisterLayout() {
    const location = useLocation()
    console.log(location)

    return (
        <div className="root-layout">
            <header>
                <nav>
                    <Logo/>
                    {/* <NavLink to="/">Home</NavLink>
                    <NavLink to="women">Women</NavLink>
                    <NavLink to="men">Men</NavLink>
                    <Search/> */}
                    <NavLink to="register">Register</NavLink>
                    {/* <NavLink to="saved-links">Saved
                        <a href="">
                            <img src="../../public/images/heart-52.png" alt="" />
                        </a>
                    </NavLink>
                    <NavLink to="your-bag">Bag</NavLink> */}

                </nav>
            </header>
            <main>
                <Outlet/>

            </main>
        </div>
    )
}