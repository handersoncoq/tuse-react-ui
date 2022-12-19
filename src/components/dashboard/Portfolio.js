import React, { useState, useEffect} from "react";
import { TuseClient } from "../../tuse-client/TuseClient";
import { useNavigate } from "react-router-dom";
import {AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

const Portfolio = () => {

    const [portfolio, setPortfolio] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const result = await TuseClient.get("userStock/userPortfolio")
                setPortfolio(result.data)
            } catch (error) {
                console.log(error)
            }
            
        }
        fetchData()
    }, [setPortfolio])

    return(
        <>  
            <div style={{marginTop: "190px", display: "block", marginLeft: "-240px"}}>
            <span className="portfolioSpan">PORTFOLIO</span>  
            </div>
            <div className="dashboard">
                <table style={{display: "block", marginLeft: "200px", marginTop: "20px"}}>
                    <thead style={{padding: "2px", fontSize: "14px", backgroundColor: "grey"}}>
                        <tr>
                            <th align="center"> Symbol </th>
                            <th align="center"> Shares </th>
                            <th align="center"> Avg Cost </th>
                            <th align="center"> Equity </th>
                            <th align="center"> Return </th>
                            <th align="center"> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            portfolio.map( stock =>
                                <tr key={stock.symbol}>
                                    <td>{stock.symbol}</td>
                                    <td>{stock.shares}</td>
                                    <td>{'$ '+ Math.round((stock.avgCost + Number.EPSILON) * 100) / 100}</td>
                                    <td>{'$ '+ Math.round((stock.equity + Number.EPSILON) * 100) / 100}</td>
                                    <td>{'$ '+ Math.round((stock.totalReturn + Number.EPSILON) * 100) / 100}
                                        <span>
                                        {stock.totalReturn < 0 ? <AiOutlineArrowDown style={{color: "red"}}/> :
                                         <AiOutlineArrowUp style={{color: "#034545"}}/>}
                                        </span>
                                    </td>
                                    <td><span
                                     className="dashboardTrade"
                                     onClick={() =>{
                                        localStorage.setItem("stockSymbol", stock.symbol);
                                        navigate("/trade");
                                     }}
                
                                     >Trade</span>
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

export default Portfolio