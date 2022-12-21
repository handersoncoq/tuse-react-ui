import React, { useState, useEffect } from "react";
import { TuseClient } from "../../tuse-client/TuseClient";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const UserStocks = () => {

    const [userStocks, setUserStocks] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const result = await TuseClient.get("userStock")
                setUserStocks(result.data)
            } catch (error) {
                console.log(error)
            }
            
        }
        fetchData()
    }, [setUserStocks])

    return (
        <>
          <Card
            sx={{
              width: 335,
              marginTop: "220px",
              marginLeft: "230px",
              backgroundColor: "#bca085",
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                align="center"
                color="rgb(10, 11, 19)"
                fontWeight="bold"
                gutterBottom
              >
                YOUR STOCKS
              </Typography>
              <Typography variant="subtitle2" component="div">
                <table
                  style={{
                    display: "block",
                    marginLeft: "-5px",
                    marginTop: "10px",
                    width: "410px",
                    height:"100px", 
                    overflow:"auto",
                    padding: "2px 0px"
                  }}
                >
                  <thead style={{ fontSize: "10px", textTransform: "uppercase" }}>
                    <tr>
                        <th align="center"> Symbol </th>
                        <th align="center"> Shares </th>
                        <th align="center"> On Sale </th>
                        <th align="center"> Selling </th>
                        <th align="center"> Action </th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: "10px" }}>
                  {
                        userStocks.map( stock =>
                        <tr key={stock.userStockId}>
                            <td>{stock.symbol}</td>
                            <td>{stock.quantity}</td>
                            <td>{stock.quantityOnSale}</td>
                            <td>{'$ '+ Math.round((stock.priceToSell + Number.EPSILON) * 100) / 100}</td>
                            <td><span
                             className="dashboardTrade"
                             onClick={() =>{
                                localStorage.setItem("stockSymbol", stock.symbol);
                                navigate("/updateSale");
                             }}
            
                             >Update</span>
                             </td>
                        </tr>
                    )}
                  </tbody>
                </table>
              </Typography>
            </CardContent>
          </Card>
        </>
      );
}

export default UserStocks