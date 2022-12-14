import React, { useState } from "react";
import { TuseClient } from "../../tuse-client/TuseClient";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { AiOutlineStock } from "react-icons/ai";
import Navbar from "../Navbar";

const SignUp = () =>{

    const navigate = useNavigate()

    const [user, setUser] = useState({
        username: "",
        password: "",
    })

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(!user.username || !user.password){
            alert("Please fill out fields")  
        } else{
            console.log(user)
            try {
                const result = await TuseClient.post("user", user)
                console.log(result)
                alert(`${result.data}`)
                navigate("/signIn")
            } catch (error) {
                console.log(error)
            }
        }
    }

    return(
        <>  
            <div onClick = {() => {navigate("/")}}>
                <Header />
            </div>
            <h1 className="orderH1"> - The Universal Stock Exchange {<AiOutlineStock style={{color: "darkcyan"}}/>}</h1>
            <span className="orderSpan">
                <span style={{color: "darkcyan", fontWeight: "650", fontSize: "larger"}}> SIGN UP </span>
            </span>
            <Navbar />
                <form className="orderInput">
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
        </>
    )
}
export default SignUp