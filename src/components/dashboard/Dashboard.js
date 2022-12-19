import React from "react";
import Header from "../Header";
import Navbar from "../Navbar";
import Portfolio from "./Portfolio";
import { AiOutlineStock } from "react-icons/ai";

const DashBoard = () => {

    return(
        <>
            <div style={{marginTop: "30.1px"}}>
                <Header/>
                <div style={{height: "20px"}}></div>
            </div>

           <div className="Sign">
                <h1> - The Universal Stock Exchange {<AiOutlineStock style={{color: "darkcyan"}}/>}</h1>
            </div>

            <span style={{
                marginBottom: "-215px", 
                marginTop: "185px", 
                display: "block", 
                marginLeft: "840px",
                color: "darkcyan",
                fontSize: "large",
                fontWeight: "bold"
                }}>
                YOUR STOCKS
            </span>  
  
            <Navbar />
            
            <Portfolio /> 

         </>
    )
}

export default DashBoard