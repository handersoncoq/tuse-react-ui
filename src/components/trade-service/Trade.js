import React from "react";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { AiOutlineStock } from "react-icons/ai";
import Navbar from "../Navbar";
import Purchase from "./Purchase";
import Sale from "./Sale";

const Trade = () => {

    const navigate = useNavigate()

    let symbol = localStorage.getItem("stockSymbol")

    return(
        <>  
            <div onClick = {() => {
                localStorage.removeItem("stockSymbol");
                navigate("/");}}>
                <Header />
            </div>
            <h1 className="orderH1"> - The Universal Stock Exchange {<AiOutlineStock style={{color: "darkcyan"}}/>}</h1>
            <span className="orderSpan">
                <span style={{color: "darkcyan"}}> Now Trading : </span>
                <span style={{color: "darkred"}}> {symbol} </span>
            </span>
            <Navbar />
            <div>
            <span className="globalSpan">
                <span style={{color: "darkcyan", fontWeight: "650", fontSize: "larger"}}> Purchase </span>
            </span>
            </div>
            <div style={{marginTop: "-40px"}}>
                <Purchase />
            </div>
            <div style={{marginTop: "180px"}}>
            <span className="globalSpan">
                <span style={{color: "darkcyan", fontWeight: "650", fontSize: "larger"}}> Sale </span>
            </span>
            </div>
            <div style={{marginTop: "-40px"}}>
                <Sale />
            </div>
        </>
    )
}
export default Trade