import React from "react";
import { useNavigate } from "react-router-dom";

const Header = (pops) => {

    const navigate = useNavigate()

    return(

        <>
            <div className="header"
                onClick = {() => {
                navigate("/");}}
            >
                <div style={{
                    backgroundImage: `url("../stockData-image.png")`,
                    height: "120px",
                    }}>
                </div>
            </div>

            <div style={{backgroundColor: " rgb(10, 11, 19)"}}
                onClick = {() => {
                navigate("/");}}
            >
                <h1 onClick={pops.resetStockList} style={{
                    marginLeft: "238px", 
                    textShadow: "0 0 3px #fff, 0 0 4px #fff",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: "450",
                    position: "fixed",
                    marginTop: "140px",                  
                    }}>
                    TU$E
                </h1>
            </div>
        </>
    )
}
export default Header