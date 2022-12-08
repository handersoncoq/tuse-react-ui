import React from "react";

const Header = (pops) => {


    return(

        <>
            <header className="frontHeader">
            </header>
            <div>
                <h1 onClick={pops.resetStockList} style={{
                    marginLeft: "238px", 
                    marginTop: "1.7%", 
                    textShadow: "0 0 3px #fff, 0 0 4px #fff",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: "450"                    
                    }}>
                    TU$E
                </h1>
            </div>
        </>
    )
}
export default Header