import React, { useState } from "react";
import { TuseClient } from "../../tuse-client/TuseClient";


const Purchase = () => {

    let clickedStockSymbol = localStorage.getItem("stockSymbol")

    const [purchase, setPurchase] = useState({
            symbol: clickedStockSymbol,
            buyingPrice: 0,
            quantity: 0
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!purchase.buyingPrice || !purchase.quantity){
            alert("Please fill out fields")  
        } else{
            try {
                const result = await TuseClient.post("purchase", purchase)
                alert(`${result.data}`)
            } catch (error) {
                console.log(error)
                alert(`Purchase was unsuccessful`)
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
                    value={purchase.quantity}
                    onChange={(event) => setPurchase({ ...purchase, quantity: event.target.valueAsNumber })}
                    />
                </div>
                <div className="div">
                    <label>Buying Price</label>
                    <input
                    className="orderInput"
                    type="number"
                    value={purchase.buyingPrice}
                    onChange={(event) => setPurchase({ ...purchase, buyingPrice: event.target.valueAsNumber })}
                    />
                </div>
                <div>
                    <button className="orderButton" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </>
    )
}
export default Purchase