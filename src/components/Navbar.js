import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"

const Navbar = () => {

    const [navbarOpen, setNavbarOpen] = useState(true)

    const handleToggle = () => {
        setNavbarOpen(prev => !prev)
    }

    const closeMenu = () => {
        setNavbarOpen(false)
      }

    const links = [
        {
            id: 1,
            path: "/",
            text: "Home"
        },
        {
            id: 2,
            path: "/register",
            text: "Register"
        },
        {
            id: 3,
            path: "/signIn",
            text: "Sign In"
        },
        {
            id: 4,
            path: "/about",
            text: "About TUSE"
        },
    ]

    return(
        <nav className="navBar">
            <button onClick={handleToggle}>
                {navbarOpen ? (
                <MdClose style={{ color: "rgb(10, 11, 19)", width: "30px", height: "40px" }} />
                ) : (
                <FiMenu style={{ color: "#008b8b", width: "30px", height: "40px" }} />
                )}
            </button>
            <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
                {links.map(link =>{
                    return (
                        <li key={link.id}>
                            <NavLink 
                            to={link.path} 
                            activeClassName = "active-link"
                            onClick={() => closeMenu()}
                            exact>
                                {link.text}
                            </NavLink>
                        </li>
                        )
                })}
            </ul>
        </nav>
    )
}
export default Navbar