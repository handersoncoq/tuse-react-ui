import React, { useState } from "react";
import { TuseClient } from "../../tuse-client/TuseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import { MdSell } from "react-icons/md";

const Purchase = () => {
  let clickedStockSymbol = localStorage.getItem("stockSymbol");

  const [purchase, setPurchase] = useState({
    symbol: clickedStockSymbol,
    buyingPrice: 0,
    quantity: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!purchase.buyingPrice || !purchase.quantity) {
      toast.error("Please fill out all fields");
    } else {
      try {
        const result = await TuseClient.post("purchase", purchase);
        toast.info(`${result.data}`);
      } catch (error) {
        console.log(error);
        toast.error(`Purchase was unsuccessful`);
      }
    }
  };

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
            marginLeft: "235px",
            marginTop: "15px",
          }}
        >
          PURCHASE {<MdSell />}
        </Typography>
        <div style={{ marginLeft: "-2px", marginTop: "40px" }}>
          <form className="trade-form" autoComplete="off">
            <div className="trade-div ">
              <label>Number of Shares</label>
              <input
                className="trade-input"
                type="number"
                value={purchase.quantity}
                onChange={(event) =>
                  setPurchase({
                    ...purchase,
                    quantity: event.target.valueAsNumber,
                  })
                }
              />
            </div>
            <div className="trade-div ">
              <label>Buying Price</label>
              <input
                className="trade-input"
                type="number"
                value={purchase.buyingPrice}
                onChange={(event) =>
                  setPurchase({
                    ...purchase,
                    buyingPrice: event.target.valueAsNumber,
                  })
                }
              />
            </div>
            <div>
              <button className="orderButton" onClick={handleSubmit}>
                <Typography sx={{ fontSize: 16, color: "white" }}>
                  BUY
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
};
export default Purchase;
