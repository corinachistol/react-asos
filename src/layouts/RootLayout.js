import { NavLink,Outlet} from "react-router-dom"
import Logo from "../components/Logo/Logo"
import './style.scss';
import { useState } from "react";

export default function RootLayout() {

    return (
        <div className="root-layout">
            <header>
                <nav>
                    <Logo/>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="women">Women</NavLink>
                    <NavLink to="men">Men</NavLink>
                    {/* trebuie o componenta search */}
                    <input type="search" name="search" id="" />
                    <NavLink to="register">Register</NavLink>
                    <NavLink to="saved-links">Saved</NavLink>
                    <NavLink to="your-bag">Bag</NavLink>

                </nav>
            </header>
            <main>
                <Outlet/>

            </main>
        </div>
    )
}