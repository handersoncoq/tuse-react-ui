import React, { useState, useEffect} from "react";
import { TuseClient } from "../../tuseClient/TuseClient";
import StockBySymbols from "../StockBySymbols";
import StocksGreaterThan from "../StocksGreaterThan";
import StocksLowerThan from "../StocksLowerThan";
import Header from "../Header";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {

    const [portfolio, setPortfolio] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const result = await TuseClient.get("portfolio")
                setPortfolio(result.data)
            } catch (error) {
                console.log(error)
            }
            
        }
        fetchData()
    }, [setPortfolio])

    return(
        <>
            <Header />
            <Navbar />
            
            <div>
                <table>
                    <thead>
                        <tr>
                            <th align="center"> Company </th>
                            <th align="center"> Symbol </th>
                            <th align="center"> Buying Price </th>
                            <th align="center"> Market Cap </th>
                            <th align="center"> Option </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            portfolio.map( stock =>
                                <tr key={stock.stockId}>
                                    <td>{stock.company}</td>
                                    <td>{stock.symbol}</td>
                                    <td>{'$ '+ Math.round((stock.price + Number.EPSILON) * 100) / 100}</td>
                                    <td>{'$ '+ Math.round((stock.marketCap + Number.EPSILON) * 100) / 100}</td>
                                    <td><button
                                     className="tableButton"
                                     onClick={() =>{
                                        localStorage.setItem("stockSymbol", stock.symbol);
                                        navigate("/trade");
                                     }}
                
                                     >Trade</button>
                                     </td>
                                </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
         </>
    )
}

export default DashBoard