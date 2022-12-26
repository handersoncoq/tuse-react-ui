import React, { useState, useEffect } from "react";
import { paths } from "../endpoints/Endpoints";
import { TuseClient } from "../tuse-client/TuseClient";
import StockBySymbols from "./filter-functions/StockBySymbols";
import StocksGreaterThan from "./filter-functions/StocksGreaterThan";
import StocksLowerThan from "./filter-functions/StocksLowerThan";
import Header from "./Header";
import Navbar from "./Navbar";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [stockList, setStockList] = useState([]);

  let numberFormatter = Intl.NumberFormat("en-US");
  const navigate = useNavigate();
  const [isOpening, setIsOpening] = useState(false);

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

  const handleClick = (path, symbol) => {
    if (!isOpening) {
      setIsOpening(true);
      const newWindow = window.open(`${path}?symbol=${symbol}`, "_blank");
      newWindow.addEventListener("load", () => {
        navigate("/", { target: "blank" });
        setIsOpening(false);
      });
    }
  };

  return (
    <>
      <span>
        <Header resetStockList={resetStockList} />
        <Navbar />
      </span>
      <div
        style={{
          marginTop: "140px",
          height: "40px",
          backgroundColor: "rgb(10, 11, 19)",
          position: "fixed",
          width: "100%",
          marginLeft: "188px",
        }}
      ></div>
      <Card
        style={{
          marginTop: "165px",
          height: "50px",
          width: "820px",
          marginLeft: "218px",
          position: "fixed",
          backgroundColor: "rgb(10, 11, 19)",
        }}
      >
        <div
          style={{
            marginTop: "-190px",
            marginLeft: "-221px",
          }}
        >
          <span className="trademark">
            <img
              onClick={resetStockList}
              src="tuse-trademark.png"
              alt="Tuse Trademark"
            />
          </span>
          <div style={{ marginTop: "165px", marginLeft: "2px" }}>
            <StockBySymbols getStockBySymbol={getStockBySymbol} />
            <StocksLowerThan getStocksLowerThan={getStocksLowerThan} />
            <StocksGreaterThan getStocksGreaterThan={getStocksGreaterThan} />
          </div>
        </div>
      </Card>
      <Card
        style={{
          marginTop: "220px",
          height: "201px",
          width: "813px",
          marginLeft: "220px",
          backgroundColor: "#bca085",
          display: "block",
        }}
        component="div"
      >
        <table
          style={{
            height: "200px",
            overflow: "auto",
            display: "block",
            marginLeft: "-3px",
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
              <th style={{ textAlign: "center" }}> Action </th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "14px", height: "180px" }}>
            {stockList.map((stock) => (
              <tr key={stock.stockId}>
                <td
                  className="navigate"
                  onClick={()=>handleClick("/stocks", stock.symbol)}
                >
                  {stock.company}
                </td>
                <td
                  className="navigate"
                  onClick={()=>handleClick("/stocks", stock.symbol)}
                >
                  {stock.symbol}
                </td>
                <td>{"$ " + numberFormatter.format(stock.price)}</td>
                <td style={{ textAlign: "center" }}>
                  {stock.trend < 0 ? (
                    <FiTrendingDown style={{ color: "red" }} />
                  ) : (
                    <FiTrendingUp style={{ color: "darkgreen" }} />
                  )}
                </td>
                <td>{numberFormatter.format(stock.volume)}</td>
                <td>{"$ " + numberFormatter.format(stock.marketCap)}</td>
                <td>
                  <span style={{ fontSize: "10px" }}>
                    <span
                      className="tableButton"
                      onClick={()=>handleClick(`${paths.buying}`, stock.symbol)}
                    >
                      &nbsp;&nbsp;&nbsp; BUY &nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span
                      className="tableButton"
                      onClick={()=>handleClick(`${paths.selling}`, stock.symbol)}
                    >
                      &nbsp;&nbsp;&nbsp; SELL &nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Typography
        style={{ marginTop: "40px", marginLeft: "539px" }}
        component="div"
      >
        News Letter Coming Soon!
      </Typography>
    </>
  );
};

export default Home;
