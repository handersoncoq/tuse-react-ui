import React, { useState, useEffect } from "react";
import Header from "../Header";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import { TuseClient } from "../../tuse-client/TuseClient";
import Sale from "./Sale";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

const Selling = () => {
  const navigate = useNavigate();
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search);
  const symbol = searchParams.get("symbol");
  let [stock, setStock] = useState([]);

  useEffect(() => {
    const getStock = async () => {
        try {
          const stock = await TuseClient.get(
            `stock/${symbol}`
          );
          setStock(stock.data);
        } catch (error) {
          console.log(error);
        }
    };
    getStock();
  }, [setStock, symbol]);

  return (
    <>
      <div
        style={{ marginTop: "30.1px" }}
        onClick={() => {
        navigate("/");
        }}
      >
        <Header />
        <div style={{ height: "20px" }}></div>
      </div>
      <div
        style={{
          backgroundColor: "rgb(10, 11, 19)",
          height: "80px",
          position: "fixed",
          marginTop: "120px",
          width: "100%",
        }}
      ></div>
      <div>
        <div
          style={{
            justifyContent: "center",
            marginTop: "-60px",
            marginLeft: "65px",
            backgroundColor: "white",
            width: "100%",
            display: "flex",
            position: "fixed",
          }}
        >
          <span style={{ color: "rgb(10, 11, 19)" }}> Now Trading : </span>
          <span style={{ color: "red" }}> {symbol} </span>
          <span style={{ color: "red" }}>
            {" "}
            {"$ " +
              Math.ceil((stock.price + Number.EPSILON) * 1000) / 1000}{" "}
          </span>
          <span>
            {stock.trend < 0 ? (
              <FiTrendingDown style={{ color: "red", marginTop: "4px" }} />
            ) : (
              <FiTrendingUp style={{ color: "#034545", marginTop: "4px" }} />
            )}
          </span>
        </div>
        <Navbar />

        <div style={{ marginTop: "-40px", marginLeft: "150px" }}>
          <Sale />
        </div>
      </div>
    </>
  );
};
export default Selling;
