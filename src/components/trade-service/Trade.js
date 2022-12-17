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
            <div style={{marginTop: "30.1px"}}
                    onClick = {() => {
                    localStorage.removeItem("stockSymbol");
                    navigate("/");}}
                >
                <Header/>
                <div style={{height: "20px"}}></div>
            </div>
            
            <div>

            <div  className="orderH1">
                    <h1 > - The Universal Stock Exchange {<AiOutlineStock style={{color: "darkcyan"}}/>}</h1>
            </div>
            <div style={{justifyContent: "center", marginTop: "-60px",
                                backgroundColor: "white",
                                width: "100%",
                                display: "flex",
                                position: "fixed"}}>
                        <span style={{color: "rgb(10, 11, 19)"}}> Now Trading : </span>
                        <span style={{color: "red"}}> {symbol} </span>
            </div>
            <Navbar />

                <div style={{marginTop: "250px"}}>
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
            </div>
        </>
    )
}
export default Trade