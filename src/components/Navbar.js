import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import SignOut from "./auth-service/SignOut";


const Navbar = () => {

    const username = localStorage.getItem("username");
    const [navbarOpen, setNavbarOpen] = useState(true)
    let links = [];

    const handleToggle = () => {
        setNavbarOpen(prev => !prev)
    }

    const closeMenu = () => {
        setNavbarOpen(false)
      }

    if(!username) {links = [
        {
            id: 1,
            path: "/",
            text: "Home"
        },
        {
            id: 2,
            path: "/signUp",
            text: "Sign Up"
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
    } else{
        links = [
            {
                id: 1,
                path: "/",
                text: "Home"
            },
            {
                id: 2,
                path: "/dashboard",
                text: "Dashboard"
            },
            {
                id: 3,
                path: "/about",
                text: "About TUSE"
            },
        ]
    }

    return(
        <nav className="navBar">
            <button onClick={handleToggle}>
                {navbarOpen ? (
                <MdClose style={{ color: "white", width: "30px", height: "18px", marginTop: "-15px", marginLeft:"40px", display: "flex" }} />
                ) : (
                <FiMenu style={{ color: "#008b8b", width: "30px", height: "40px", marginLeft: "55px" }} />
                )}
            </button>
            <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
            <span>
                <BsPersonCircle style={{ color: "rgb(10, 11, 19)", height: "120px", marginTop: "20px", width: "25%", marginLeft:"65px" }}/>
                <p className="username">{username}</p>
            </span>
                <div style={{ marginTop: "-90px"}}>
                    {links.map(link =>{
                        return (
                            <li key={link.id}>
                                <NavLink
                                className="active-link"
                                to={link.path}
                                onClick={() => closeMenu()}
                                >
                                    {link.text}
                                </NavLink>
                            </li>
                            )
                    })}
                    {username ? <SignOut /> : ""}
                </div>
            </ul>
        </nav>
    )
}
export default Navbar