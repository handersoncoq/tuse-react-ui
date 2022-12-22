import React, { useState } from "react";
import { TuseClient } from "../../tuse-client/TuseClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import {FaFileInvoiceDollar} from "react-icons/fa";


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

    return (
        <>
          <Card
            style={{
              marginTop: "250px",
              marginLeft: "190px",
              height: "200px",
              width: "550px",
              backgroundColor: "#8d6f53",
            }}
          >
            {" "}
            <Typography
              style={{
                position: "relative",
                marginLeft: "248px",
                marginTop: "15px",
              }}
            >
              SALE {<FaFileInvoiceDollar />}
            </Typography>
            <div style={{ marginLeft: "-2px", marginTop: "40px" }}>
              <form className="trade-form" autoComplete="off">
                <div className="trade-div ">
                  <label>Number of Shares</label>
                  <input
                    className="trade-input"
                    type="number"
                    value={sale.quantity}
                    onChange={(event) =>
                      setSale({
                        ...sale,
                        quantity: event.target.valueAsNumber,
                      })
                    }
                  />
                </div>
                <div className="trade-div ">
                  <label>Selling Price</label>
                  <input
                    className="trade-input"
                    type="number"
                    value={sale.sellingPrice}
                    onChange={(event) =>
                      setSale({
                        ...sale,
                        sellingPrice: event.target.valueAsNumber,
                      })
                    }
                  />
                </div>
                <div>
                  <button className="orderButton" onClick={handleSubmit}>
                    <Typography sx={{ fontSize: 16, color: "white" }}>
                      SELL
                    </Typography>
                  </button>
                </div>
              </form>
            </div>
          </Card>
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
        </>
      );
}
export default Sale