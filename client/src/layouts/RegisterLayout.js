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
                    <NavLink to="register">Register</NavLink>

                </nav>
            </header>
            <main>
                <Outlet/>

            </main>
        </div>
    )
}