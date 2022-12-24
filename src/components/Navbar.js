import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import { MdClose } from "react-icons/md"
// import { FiMenu } from "react-icons/fi";
import { BsPersonCircle, BsFillPersonFill, BsFacebook } from "react-icons/bs";
import { RiHome7Fill } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaSignInAlt, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { MdDashboardCustomize } from "react-icons/md";
import { AiFillTwitterCircle } from "react-icons/ai";
import { TuseClient } from "../tuse-client/TuseClient";
import SignOut from "./auth-service/SignOut";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from "@mui/material/Card";


const Navbar = () => {

    let [username, setUsername] = useState("");
    const [navbarOpen, setNavbarOpen] = useState(true);
    const navigate = useNavigate();
    let links = [];

    // const handleToggle = () => {
    //     setNavbarOpen(prev => !prev)
    // }

    React.useEffect( () =>{
        const getCurrentUser = async () =>{
            if(localStorage.getItem("signIn")){
                try {
                const user = await TuseClient.get("user")
                setUsername(user.data.username)
            } catch (error) {
                // console.log(error)
            }}
        }
        getCurrentUser()
    }, [username]) 

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
                path: "/manage",
                text: "Manage",
                icon: <BsFillPersonFill/>
            },
        ]
    }

    return(
        <nav className="navBar">
            
            <ul className={`menuNav ${navbarOpen ? " showMenu" : "showMenu"}`}>
            <span>
               {username ? <BsPersonCircle onClick = {() =>navigate("/manage")} style={{ color: "rgb(10, 11, 19)", height: "120px", marginTop: "16px", width: "25%", marginLeft:"65px", cursor: "pointer" }}/>
                : 
                <Card
                sx={{
                    width: 100,
                    height: 100,
                    backgroundColor: "#8f7358",
                    marginLeft: "45px",
                    borderRadius: '50%',
                    marginBottom: "25px"
                  }}
                ><img onClick = {() =>navigate("/")} src="tuse-logo.png" alt="Tuse Logo"/></Card>
                }
                {username ? <p onClick = {() =>navigate("/manage")} className="username">{username}</p> : <hr style={{width:"70%", size:"20", marginLeft:"25px"}}/>}
                {
                    username ? <hr style={{ width:"70%", size:"20", marginLeft:"25px", marginTop: "25px", marginBottom: "-5px" }}></hr>
                    : ""
                }

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
                                <span 
                                
                                style = {{
                                width:"25px", 
                                height: "23px", 
                                borderRadius: "50%",
                                }}>
                                <Card
                                style={{
                                    borderRadius: '50%',
                                    width:"25px", 
                                    height: "25px",
                                    color: "darkred",
                                    marginTop: "-23px",
                                    backgroundColor: "#8f7358",
                                    textAlign: "center",
                                }}
                                >{link.icon}</Card>
                                </span>
                                    <span>{link.text}</span>
                                </NavLink>
                            </li>
                            )
                    })}
                    {username ? <span onClick={()=> {toast.info("You've successfully signed out!");
                    setUsername("")}}
                    >< SignOut /></span> :
                    <hr style={{ width:"70%", size:"20", marginLeft:"25px", marginTop: "40px", marginBottom: "-5px" }}></hr>}
                {
                    username ? <hr style={{ width:"70%", size:"20", marginLeft:"25px", marginTop: "5px", marginBottom: "-5px" }}></hr>
                    : ""
                }
                </div>
                <ToastContainer 
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                    <span style={{marginLeft: "41px"}}>
                        <span><a className="a" href="https://twitter.com/?lang=en" target="_blank" rel="noreferrer">
                            <AiFillTwitterCircle style={{height: "70px", width: "22px", color: "rgb(15, 16, 26)"}}/>
                            </a>
                        </span>
                        <span><a className="a" href="https://www.linkedin.com/feed/" target="_blank" rel="noreferrer">
                            <FaLinkedin style={{height: "70px", width: "18px", color: "rgb(15, 16, 26)"}}/>
                            </a>
                        </span>
                        <span><a className="a" href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                            <BsFacebook style={{height: "70px", width: "20px", color: "rgb(15, 16, 26)"}}/>
                            </a>
                        </span>
                    </span>
            </ul>
        </nav>
    )
}
export default Navbar