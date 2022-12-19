import React, { useState } from "react";
import { TuseClient } from "../../tuse-client/TuseClient";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () =>{

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
                const result = await TuseClient.post("user", user)
                toast.info(`${result.data}`)
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
            <img 
            style={{marginTop: "15px", marginLeft: "-160px"}}
            onClick = {() =>navigate("/")} src="tuse-arrow.png" alt="Tuse Arrow"/>
            </div>
            <div style={{marginTop: "202px"}}>
                <span className="globalSpan">
                        <span style={{color: "darkcyan", fontWeight: "650", fontSize: "larger", marginLeft: "150px"}}> 
                        SIGN UP </span>
                </span>
            </div>
            <Navbar />
                <div style={{ marginLeft: "150px", marginTop: "-30px"}}>
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
                            <button className="orderButton" onClick={handleSubmit}>SUBMIT</button>
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
export default SignUp