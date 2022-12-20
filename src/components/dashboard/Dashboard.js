import React from "react";
import Header from "../Header";
import Navbar from "../Navbar";
import Portfolio from "./Portfolio";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {

    const navigate = useNavigate()

    return(
        <>
            <div style={{marginTop: "30.1px"}}>
                <Header/>
                <div style={{height: "20px"}}></div>
            </div>

            <div  className="Sign">
            <img 
            style={{marginTop: "15px", marginLeft: "-160px"}}
            onClick = {() =>navigate("/")} src="tuse-arrow.png" alt="Tuse Arrow"/>
            </div> 
  
            <Navbar />
            
            <Portfolio /> 

         </>
    )
}

export default DashBoard