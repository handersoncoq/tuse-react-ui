import React, { useState, useEffect } from "react";
import { paths } from "../../endpoints/Endpoints";
import { TuseClient } from "../../tuse-client/TuseClient";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const UserStocks = () => {
  const [userStocks, setUserStocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("signIn")){try {
        const result = await TuseClient.get("userStock");
        setUserStocks(result.data);
      } catch (error) {
        console.log(error);
      }}
    };
    fetchData();
  }, [setUserStocks]);

  return (
    <>
      <Card
        sx={{
          width: 353,
          marginTop: "220px",
          marginLeft: "215px",
          backgroundColor: "rgb(21, 22, 27)",
          border: "solid",
          borderColor: "white",
          borderWidth: "0.7px",
          borderStyle: "onset"
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 14 }}
            align="center"
            color="darkcyan"
            fontWeight="bold"
            gutterBottom
          >
            YOUR STOCKS
          </Typography>
          <Typography variant="subtitle2" component="div">
            <table
              style={{
                display: "block",
                width: "332px",
                marginLeft: "-5px",
                marginTop: "10px",
                height: "100px",
                overflow: "auto",
                padding: "2px 0px",
              }}
            >
              <thead style={{ fontSize: "10px", textTransform: "uppercase" }}>
                <tr>
                  <th align="center"> Symbol </th>
                  <th align="center"> Shares </th>
                  <th align="center"> # On Sale </th>
                  <th align="center"> Price </th>
                  <th align="center"> Action </th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "10px" }}>
                {userStocks.map((stock) => (
                  <tr key={stock.userStockId}>
                    <td>{stock.symbol}</td>
                    <td>{stock.quantity}</td>
                    <td>{stock.quantityOnSale}</td>
                    <td>
                      {stock.priceToSell !== null
                        ? "$ " +
                          Math.round(
                            (stock.priceToSell + Number.EPSILON) * 100
                          ) /
                            100
                        : ""}
                    </td>
                    <td>
                      <span
                        className="dashboardTrade"
                        onClick={() => {
                          localStorage.setItem("stockSymbol", stock.symbol);
                          window.open(`${paths.saleUpdate}`, "_blank");
                        }}
                      >
                        Update
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default UserStocks;
