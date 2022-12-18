import React, { useState, useEffect} from "react";import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { AiOutlineStock } from "react-icons/ai";
import Navbar from "../Navbar";
import { TuseClient } from "../../tuse-client/TuseClient";
import Purchase from "./Purchase";
import Sale from "./Sale";
import {FiTrendingUp, FiTrendingDown } from "react-icons/fi";

const Trade = () => {

    const navigate = useNavigate()

    let symbol = localStorage.getItem("stockSymbol")
    let [stock, setStock] = useState([])

    useEffect( () =>{
        const getStock = async () =>{
            if(localStorage.getItem("stockSymbol")){
                try {
                const stock = await TuseClient.get(`stock/${localStorage.getItem("stockSymbol")}`)
                setStock(stock.data)
            } catch (error) {
                console.log(error)
            }}
        }
        getStock();
    }, [setStock])

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
                        <span style={{color: "red"}}> {'$ '+ Math.ceil((stock.price + Number.EPSILON) * 1000) / 1000} </span>
                        <span>{stock.trend < 0 ? <FiTrendingDown style={{color: "red", marginTop: "4px"}}/> : <FiTrendingUp style={{color: "#034545", marginTop: "4px"}}/>}</span>
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