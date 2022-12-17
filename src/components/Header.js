import React from "react";

const Header = (pops) => {


    return(

        <>
            <div className="header">
                <div style={{
                    backgroundImage: `url("../stockData-image.png")`,
                    height: "120px",
                    }}>
                </div>
            </div>

            <div style={{backgroundColor: " rgb(10, 11, 19)"}}>
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