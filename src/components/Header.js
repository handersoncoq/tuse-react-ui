import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TuseClient } from "../tuse-client/TuseClient";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

const Header = (pops) => {
  const navigate = useNavigate();
  const [stockList, setStockList] = useState([]);

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

  return (
    <>
      <div
        className="header"
        onClick={() => {
          navigate("/");
        }}
      >
        <div
          style={{
            backgroundImage: `url("../tuse-header.png")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
            backgroundSize: "cover",
            height: "120px",
            border: "solid",
            borderWidth: "0.1px",
            borderStyle: " none none  outset outset",
            marginLeft: "28px"
          }}
        ></div>
        <div className="holder">
          {stockList.map((stock) => (
            <span key={stock.stockId} className="stockShow">
              <span>{stock.symbol}</span>
              <span>
                {"$ " + Math.ceil((stock.price + Number.EPSILON) * 100) / 100}
              </span>
              <span>
                {stock.trend < 0 ? (
                  <AiOutlineArrowDown style={{ color: "red" }} />
                ) : (
                  <AiOutlineArrowUp style={{ color: "darkgreen" }} />
                )}
              </span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};
export default Header;
