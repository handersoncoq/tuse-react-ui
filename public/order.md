```js

import React, { useState } from "react";
import { TuseClient } from "../tuseClient/TuseClient";
import TuseContainer from "./TuseContainer";

const Order = () => {

    const [order, setOrder] = useState({
            Symbol: "",
            buyingPrice: "",
            quantity: ""
    })


    const getSymbol = (symbol) => {
        setOrder({
            ...Order,
            Symbol: symbol,
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!order.Symbol || !order.buyingPrice || !order.quantity){
            alert("Please fill out fields")  
        } else{
            try {
                const result = await TuseClient.post("order", order)
                console.log(result)
                alert(`Your purchase of the stock ${order.Symbol} was successful`)
            } catch (error) {
                console.log(error)
                alert(`Your purchase of the stock ${order.Symbol} was unsuccessful`)
            }
        }
    }

    return(
        <>
                <TuseContainer getSymbol = {getSymbol}/>
                <form className=".orderForm.openForm">
                    <input
                    type="text"
                    placeholder="Enter quantity"
                    value={order.quantity}
                    onChange={(event) => setOrder({ ...order, quantity: event.target.value })}
                    />
                    <input
                    type="text"
                    placeholder="Enter buying price"
                    value={order.buyingPrice}
                    onChange={(event) => setOrder({ ...order, buyingPrice: event.target.value })}
                    />
                    <button onClick={handleSubmit}>Submit</button>
                </form>
        </>
    )
}
export default Order

```