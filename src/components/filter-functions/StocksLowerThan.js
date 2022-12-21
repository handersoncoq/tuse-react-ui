import React, { useState } from "react";
import {FaSearchengin} from "react-icons/fa"

const StocksLowerThan = (props) => {

    const [price, setPrice] = useState("")

    const onChange = (e) => {
        setPrice(e.target.value)
    }

    const handleSubmit = async (e) => {
        if(price.trim()){
            e.preventDefault()
            props.getStocksLowerThan(price)
            setPrice("")
        } else{
            alert("please insert a value")
        }
    }

    return(
        <form 
            onSubmit={handleSubmit} 
            className = "form-container-lowerPrice"
            >
            <input
                type="number"
                placeholder="Filter by max price ($ US)"
                value={price}
                onChange={onChange}
                className="inputClass"
            />
            <button className="input-submit">
                <FaSearchengin style = {{color:"darkcyan", size: "20px", marginTop:"2px"}}/>
            </button>
        </form>
    )
}
export default StocksLowerThan