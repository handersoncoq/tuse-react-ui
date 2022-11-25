import React, { useState } from "react";
import {FaSearchengin} from "react-icons/fa"

const StockBySymbols = (props) => {

    const [symbol, setSymbol] = useState("")

    const onChange = (e) => {
        setSymbol(e.target.value)
    }

    const handleSubmit = async (e) => {
        if(symbol.trim()){
            e.preventDefault()
            props.getStockBySymbol(symbol)
            setSymbol("")  
        } else{
            alert("please inset a stock symbol")
        }
    }

    return(
        <form 
            onSubmit={handleSubmit} 
            className = "form-container-symbol"
            >
            <input
                type="text"
                placeholder="Search a ticker (e.g: aapl)"
                value={symbol}
                onChange={onChange}
                className="inputClass"
            />
            <button className="input-submit">
                <FaSearchengin style = {{color:"darkcyan", size: "20px", marginTop:"2px"}}/>
            </button>
        </form>
    )
}
export default StockBySymbols