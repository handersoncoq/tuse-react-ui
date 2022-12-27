import React, { useState, useEffect } from "react";
import { paths } from "../../endpoints/Endpoints";
import { TuseClient } from "../../tuse-client/TuseClient";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [isOpening, setIsOpening] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("signIn")){try {
        const result = await TuseClient.get("userStock/userPortfolio");
        setPortfolio(result.data);
      } catch (error) {
        console.log(error);
      }}
    };
    fetchData();
  }, [setPortfolio]);

  const handleClick = (path, symbol) => {
    if (!isOpening) {
      setIsOpening(true);
      const newWindow = window.open(`${path}?symbol=${symbol}`, "_blank");
      newWindow.addEventListener("load", () => {
        navigate("/dashboard", { target: "blank" });
        setIsOpening(false);
      });
    }
  };

  return (
    <>
      <Card
        sx={{
          width: 435,
          marginTop: "220px",
          marginLeft: "225px",
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
            YOUR PORTFOLIO
          </Typography>
          <Typography variant="subtitle2" component="div">
            <table
              style={{
                display: "block",
                marginLeft: "-5px",
                marginTop: "10px",
                width: "410px",
                height: "100px",
                overflow: "auto",
                padding: "2px 0px",
              }}
            >
              <thead style={{ fontSize: "10px", textTransform: "uppercase" }}>
                <tr>
                  <th align="center"> Stock </th>
                  <th align="center"> Shares </th>
                  <th align="center"> Avg. Cost </th>
                  <th align="center"> Equity </th>
                  <th align="center"> Return </th>
                  <th style={{ textAlign: "center" }}> Action </th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "10px" }}>
                {portfolio.map((stock) => (
                  <tr key={stock.symbol}>
                    <td>{stock.symbol}</td>
                    <td>{stock.shares}</td>
                    <td>
                      {"$ " +
                        Math.round((stock.avgCost + Number.EPSILON) * 100) /
                          100}
                    </td>
                    <td>
                      {"$ " +
                        Math.round((stock.equity + Number.EPSILON) * 100) / 100}
                    </td>
                    <td>
                      {"$ " +
                        Math.round((stock.totalReturn + Number.EPSILON) * 100) /
                          100}
                      <span>
                        {stock.totalReturn < 0 ? (
                          <AiOutlineArrowDown style={{ color: "red" }} />
                        ) : (
                          <AiOutlineArrowUp style={{ color: "#034545" }} />
                        )}
                      </span>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <span
                        className="dashboardTrade"
                        onClick={() => handleClick(`${paths.trading}`, stock.symbol)}
                      >
                        Trade
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

export default Portfolio;
