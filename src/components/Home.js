import React, { useState, useEffect} from "react";
import { TuseClient } from "../tuse-client/TuseClient";
import StockBySymbols from "./filter-functions/StockBySymbols";
import StocksGreaterThan from "./filter-functions/StocksGreaterThan";
import StocksLowerThan from "./filter-functions/StocksLowerThan";
import Header from "./Header";
import Navbar from "./Navbar";
import {FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const [stockList, setStockList] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const result = await TuseClient.get("stock/all")
                setStockList(result.data)
            } catch (error) {
                console.log(error)
            }
            
        }
        fetchData()
    }, [setStockList])

    const resetStockList = async () => {
        try {
            const result = await TuseClient.get("stock/all")
            setStockList(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getStockBySymbol = async (symbol) => {
        try {
            const result = await TuseClient.get(`stock/symbol/${symbol}`)
            setStockList(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getStocksLowerThan = async (price) => {
        try {
            const result = await TuseClient.get(`stock/lowerThan/${price}`)
            setStockList(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getStocksGreaterThan = async (price) => {
        try {
            const result = await TuseClient.get(`stock/greaterThan/${price}`)
            setStockList(result.data)
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            <Header resetStockList = {resetStockList}/>
            <StockBySymbols getStockBySymbol = {getStockBySymbol} />
            <StocksLowerThan getStocksLowerThan = {getStocksLowerThan} />
            <StocksGreaterThan getStocksGreaterThan = {getStocksGreaterThan} />
            <Navbar />
            
            <table>

                <thead>
                    <tr>
                        <th align="center"> Company </th>
                        <th align="center"> Symbol </th>
                        <th align="center"> Price </th>
                        <th align="center"> Trend </th>
                        <th align="center"> Option </th>
                    </tr>
                </thead>

                <tbody>
                    { 
                        stockList.map( stock => 
                            <tr key={stock.stockId}>
                                <td>{stock.company}</td>
                                <td>{stock.symbol}</td>
                                <td>{'$ '+ Math.round((stock.price + Number.EPSILON) * 100) / 100}</td>
                                <td>{stock.trend < 0 ? <FiTrendingDown style={{color: "red", marginLeft: "12px"}}/> : <FiTrendingUp style={{color: "#034545", marginLeft: "12px"}}/>}</td>
                                <td><button
                                 className="tableButton"
                                 onClick={() =>{
                                    localStorage.setItem("stockSymbol", stock.symbol);
                                    navigate("/trade");
                                 }}
                                 
                                 >Buy/Sell</button>
                                 </td>
                            </tr>
                            )
                    }
                </tbody>
            </table>
         </>
    )
}

export default Home