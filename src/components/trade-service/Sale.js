import React, { useState } from "react";
import { TuseClient } from "../../tuse-client/TuseClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
            toast.error("Please fill out all fields")  
        } else{
            console.log(sale)
            try {
                const result = await TuseClient.post("sale", sale)
                console.log(result)
                toast.info(`${result.data}`)
            } catch (error) {
                console.log(error)
                toast.error(`Sale was unsuccessful`)
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
                <ToastContainer 
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
            </form>
        </>
    )
}
export default Sale