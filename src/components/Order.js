import React, { useState } from "react";
import { TuseClient } from "../tuseClient/TuseClient";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { AiOutlineStock } from "react-icons/ai";
import Navbar from "./Navbar";

const Order = () => {

    const navigate = useNavigate()

    let clickedStockSymbol = localStorage.getItem("stockSymbol")

    const [order, setOrder] = useState({
            symbol: clickedStockSymbol,
            buyingPrice: 0,
            quantity: 0
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!order.buyingPrice || !order.quantity){
            alert("Please fill out fields")  
        } else{
            console.log(order)
            try {
                const result = await TuseClient.post("order", order)
                console.log(result)
                alert(`Your purchase of the stock ${order.symbol} was successful`)
            } catch (error) {
                console.log(error)
                alert(`Your purchase of the stock ${order.symbol} was unsuccessful`)
            }
        }
    }

    return(
        <>  
            <div onClick = {() => {
                    localStorage.removeItem("stockSymbol");
                    navigate("/");
                    }
                    }>
                <Header />
                
            </div>
            <h1 className="orderH1"> - The Universal Stock Exchange {<AiOutlineStock style={{color: "darkcyan"}}/>}</h1>
            <span className="orderSpan">
                <span style={{color: "darkcyan"}}> Now Buying : </span>
                <span style={{color: "darkred"}}> {order.symbol} </span>
            </span>
            <Navbar />
                <form className="orderInput">
                    <div className="div">
                        <label>Number of Shares</label>
                        <input
                        className="orderInput"
                        type="number"
                        placeholder="i.e: 100"
                        value={order.quantity}
                        onChange={(event) => setOrder({ ...order, quantity: event.target.valueAsNumber })}
                        />
                    </div>
                    <div className="div">
                        <label>Buying Price</label>
                        <input
                        className="orderInput"
                        type="number"
                        placeholder="i.e: 12.5"
                        value={order.buyingPrice}
                        onChange={(event) => setOrder({ ...order, buyingPrice: event.target.valueAsNumber })}
                        />
                    </div>
                    <div>
                        <button className="orderButton" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
        </>
    )
}
export default Order