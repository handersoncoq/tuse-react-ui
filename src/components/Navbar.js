import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi";
import { BsPersonCircle, BsFillPersonFill } from "react-icons/bs";
import { RiHome7Fill } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaSignInAlt, FaEnvelope } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { MdDashboardCustomize } from "react-icons/md";
import SignOut from "./auth-service/SignOut";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const username = localStorage.getItem("username");
    const [navbarOpen, setNavbarOpen] = useState(true)
    const navigate = useNavigate();
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
            text: "Home",
            icon: <RiHome7Fill/>
        },
        {
            id: 2,
            path: "/signUp",
            text: "Sign Up",
            icon: <SiGnuprivacyguard/>
        },
        {
            id: 3,
            path: "/signIn",
            text: "Sign In",
            icon: <FaSignInAlt/>
        },
        {
            id: 4,
            path: "/about",
            text: "About TUSE",
            icon: <FcAbout/>
        },
    ]
    } else{
        links = [
            {
                id: 1,
                path: "/",
                text: "Home",
                icon: <RiHome7Fill/>
            },
            {
                id: 2,
                path: "/dashboard",
                text: "Dashboard",
                icon: <MdDashboardCustomize/>
            },
            {
                id: 3,
                path: "/inbox",
                text: "Inbox",
                icon: <FaEnvelope/>
            },
            {
                id: 4,
                path: "/account",
                text: "Account",
                icon: <BsFillPersonFill/>
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
               {username ? <BsPersonCircle onClick = {() =>navigate("/account")} style={{ color: "rgb(10, 11, 19)", height: "120px", marginTop: "20px", width: "25%", marginLeft:"65px", cursor: "pointer" }}/>
                : <hr style={{width:"70%", size:"20", marginLeft:"25px", marginTop: "60px" }}/>}
                {username ? <p className="username">{username}</p> : ""}

            </span>
                <div style={{ marginTop: "-100px"}}>
                    {links.map(link =>{
                        return (
                            <li key={link.id}>
                                <NavLink
                                className="active-link"
                                to={link.path}
                                onClick={() => closeMenu()}
                                >
                                <span style = {{color: "darkred", justifyContent: "space-around"}}>{link.icon}</span>
                                {link.text}
                                </NavLink>
                            </li>
                            )
                    })}
                    {username ? <span>< SignOut /></span> :
                    <hr style={{ width:"70%", size:"20", marginLeft:"25px", marginTop: "60px" }}></hr>}
                </div>
            </ul>
        </nav>
    )
}
export default Navbar