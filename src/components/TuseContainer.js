import React, { useState, useEffect} from "react";
import { TuseClient } from "../tuseClient/TuseClient";
import StockBySymbols from "./StockBySymbols";
import StocksGreaterThan from "./StocksGreaterThan";
import StocksLowerThan from "./StocksLowerThan";
import Header from "./Header";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const TuseContainer = () => {

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
                        <th align="center"> Market Cap </th>
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
                                <td>{'$ '+ Math.round((stock.marketCap + Number.EPSILON) * 100) / 100}</td>
                                <td><button
                                 className="tableButton"
                                 onClick={() =>{
                                    localStorage.setItem("stockSymbol", stock.symbol);
                                    navigate("/order");
                                 }}
                                 
                                 >Buy</button>
                                 </td>
                            </tr>
                            )
                    }
                </tbody>
            </table>
         </>
    )
}

export default TuseContainer