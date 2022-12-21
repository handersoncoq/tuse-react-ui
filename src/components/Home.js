import React, { useState, useEffect } from "react";
import { TuseClient } from "../tuse-client/TuseClient";
import StockBySymbols from "./filter-functions/StockBySymbols";
import StocksGreaterThan from "./filter-functions/StocksGreaterThan";
import StocksLowerThan from "./filter-functions/StocksLowerThan";
import Header from "./Header";
import Navbar from "./Navbar";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

const Home = () => {
  const [stockList, setStockList] = useState([]);

  const navigate = useNavigate();
  let numberFormatter = Intl.NumberFormat("en-US");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await TuseClient.get("stock/all");
        setStockList(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setStockList]);

  const resetStockList = async () => {
    try {
      const result = await TuseClient.get("stock/all");
      setStockList(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStockBySymbol = async (symbol) => {
    try {
      const result = await TuseClient.get(`stock/symbol/${symbol}`);
      setStockList(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStocksLowerThan = async (price) => {
    try {
      const result = await TuseClient.get(`stock/lowerThan/${price}`);
      setStockList(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStocksGreaterThan = async (price) => {
    try {
      const result = await TuseClient.get(`stock/greaterThan/${price}`);
      setStockList(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <span>
        <Header resetStockList={resetStockList} />
        <Navbar />
      </span>
      <Card
      style={{
        marginTop: "165px",
        height: "50px",
        width: "800px",
        marginLeft: "228px",
        position: "fixed",
        backgroundColor: "rgb(10, 11, 19)"
      }}
      >
          <div
          style={{
            marginTop: "-190px",
            marginLeft: "-226px",
          }}
          >
              <span className="trademark">
                <img
                  onClick={resetStockList}
                  src="tuse-trademark.png"
                  alt="Tuse Trademark"
                />
              </span>
              <div style={{ marginTop: "165px", marginLeft: "-9px" }}>
                <StockBySymbols getStockBySymbol={getStockBySymbol} />
                <StocksLowerThan getStocksLowerThan={getStocksLowerThan} />
                <StocksGreaterThan getStocksGreaterThan={getStocksGreaterThan} />
              </div>
          </div>
      </Card>
      <Typography style={{ marginTop: "220px" }} component="div">
        <table
          style={{
            width: "800px",
            height: "200px",
            overflow: "auto",
            display: "block",
            marginLeft: "228px",
          }}
        >
          <thead style={{ fontSize: "13.9px", textTransform: "uppercase" }}>
            <tr>
              <th align="center"> Company </th>
              <th align="center"> Symbol </th>
              <th align="center"> Price </th>
              <th align="center"> Trend </th>
              <th align="center"> Volume </th>
              <th align="center"> Market Capitalization </th>
              <th align="center"> Action </th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "14px", height: "180px" }}>
            {stockList.map((stock) => (
              <tr key={stock.stockId}>
                <td>{stock.company}</td>
                <td>{stock.symbol}</td>
                <td>{"$ " + numberFormatter.format(stock.price)}</td>
                <td>
                  {stock.trend < 0 ? (
                    <FiTrendingDown
                      style={{ color: "red", marginLeft: "20px" }}
                    />
                  ) : (
                    <FiTrendingUp
                      style={{ color: "darkgreen", marginLeft: "12px" }}
                    />
                  )}
                </td>
                <td>{numberFormatter.format(stock.volume)}</td>
                <td>{"$ " + numberFormatter.format(stock.marketCap)}</td>
                <td>
                  <span
                    className="tableButton"
                    onClick={() => {
                      localStorage.setItem("stockSymbol", stock.symbol);
                      navigate("/trade");
                    }}
                  >
                    Trade
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Typography>

      <Typography
        style={{ marginTop: "40px", marginLeft: "239px" }}
        component="div"
      >
        News Letter Coming Soon!
      </Typography>
    </>
  );
};

export default Home;
