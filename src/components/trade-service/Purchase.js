import React, { useState } from "react";
import { TuseClient } from "../../tuse-client/TuseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import { MdSell } from "react-icons/md";
import { useLocation } from "react-router-dom";
import TextField from '@mui/material/TextField';

const Purchase = () => {

  const location = useLocation()

  const searchParams = new URLSearchParams(location.search);
  const stockSymbol = searchParams.get("symbol");

  const [purchase, setPurchase] = useState({
    symbol: stockSymbol,
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
          backgroundColor: "rgb(21, 22, 27)",
          border: "solid",
          borderColor: "white",
          borderWidth: "0.7px",
          borderStyle: "onset",
          borderRadius: "7px"
        }}
      >
        {" "}
        <Typography
          style={{
            marginLeft: "235px",
            marginTop: "15px",
            color: "darkcyan"
          }}
        >
          PURCHASE {<MdSell />}
        </Typography>
        <div style={{ marginLeft: "-2px", marginTop: "40px" }}>
          <form className="trade-form" autoComplete="off">
              <TextField 
                id="outlined-number" 
                label="# of Shares" 
                variant="filled"
                type="number"
                InputLabelProps={{
                  backgroundColor: "rgb(10, 11, 19)",
                }}
                value={purchase.quantity}
                onChange={(event) =>
                  setPurchase({
                    ...purchase,
                    quantity: event.target.valueAsNumber,
                  })
                }
              />
              <TextField
                id="outlined-number" 
                label="$ Bid" 
                variant="filled"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={purchase.buyingPrice}
                onChange={(event) =>
                  setPurchase({
                    ...purchase,
                    buyingPrice: event.target.valueAsNumber,
                  })
                }
              />
            <div>
              <button className="orderButton" onClick={handleSubmit}>
                <Typography sx={{ fontSize: 16, color: "#0F101A", fontWeight: "bold", }}>
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
