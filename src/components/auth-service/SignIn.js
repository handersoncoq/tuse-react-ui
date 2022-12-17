import React, { useState } from "react";
import { TuseClient } from "../../tuse-client/TuseClient";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { AiOutlineStock } from "react-icons/ai";
import Navbar from "../Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () =>{

    const navigate = useNavigate()

    const [user, setUser] = useState({
        username: "",
        password: "",
    })

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(!user.username || !user.password){
            toast.error("Please fill out all fields")  
        } else{
            console.log(user)
            try {
                const result = await TuseClient.post("auth", user)
                if(result.data === "Success") {
                    localStorage.setItem("username", user.username);
                    navigate("/");
                }else toast(`${result.data}`)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return(
        <>  
            <div style={{marginTop: "30.1px"}}
                    onClick = {() => {
                    navigate("/");}}
                >
                <Header/>
                <div style={{height: "20px"}}></div>
            </div>

           <div className="Sign">
                <h1> - The Universal Stock Exchange {<AiOutlineStock style={{color: "darkcyan"}}/>}</h1>
            </div>
            <div style={{marginTop: "190px"}}>
                <span className="globalSpan">
                        <span style={{color: "darkcyan", fontWeight: "650", fontSize: "larger"}}> SIGN IN </span>
                </span>
            </div>
            <Navbar />
                <div>
                    <form className="formInput">
                        <div className="div">
                            <label>Username</label>
                            <input
                            className="orderInput"
                            type="text"
                            placeholder="coolUser@1"
                            value={user.username}
                            onChange={(event) => setUser({ ...user, username: event.target.value })}
                            />
                        </div>
                        <div className="div">
                            <label>Password</label>
                            <input
                            className="orderInput"
                            type="password"
                            placeholder="strongPass123"
                            value={user.password}
                            onChange={(event) => setUser({ ...user, password: event.target.value })}
                            />
                        </div>
                        <div>
                            <button className="orderButton" onClick={handleSubmit}>Submit</button>
                        </div>
                    </form>
                    <ToastContainer 
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                </div>
        </>
    )
}
export default SignIn