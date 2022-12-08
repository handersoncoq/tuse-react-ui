import React, { useState } from "react";
import { TuseClient } from "../../tuse-client/TuseClient";


const Sale = () => {

    let clickedStockSymbol = localStorage.getItem("stockSymbol")

    const [sale, setSale] = useState({
            symbol: clickedStockSymbol,
            sellingPrice: 0,
            quantity: 0
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!sale.sellingPrice || !sale.quantity){
            alert("Please fill out fields")  
        } else{
            console.log(sale)
            try {
                const result = await TuseClient.post("order", sale)
                console.log(result)
                alert(`Your sale of the stock ${sale.symbol} was successful`)
            } catch (error) {
                console.log(error)
                alert(`Your sale of the stock ${sale.symbol} was unsuccessful`)
            }
        }
    }

    return(
        <>  
            <form className="orderInput">
                <div className="div">
                    <label>Number of Shares</label>
                    <input
                    className="orderInput"
                    type="number"
                    value={sale.quantity}
                    onChange={(event) => setSale({ ...sale, quantity: event.target.valueAsNumber })}
                    />
                </div>
                <div className="div">
                    <label>Selling Price</label>
                    <input
                    className="orderInput"
                    type="number"
                    value={sale.sellingPrice}
                    onChange={(event) => setSale({ ...sale, sellingPrice: event.target.valueAsNumber })}
                    />
                </div>
                <div>
                    <button className="orderButton" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </>
    )
}
export default Sale