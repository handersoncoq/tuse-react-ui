import React, { useState, useEffect} from "react";
import { TuseClient } from "../../tuse-client/TuseClient";
import { useNavigate } from "react-router-dom";

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

    return(
        <>
            <div className="userStocks">
                <table style={{display: "block", marginLeft: "700px", marginTop: "-65px"}}>
                    <thead style={{padding: "2px", fontSize: "14px", backgroundColor: "grey"}}>
                        <tr>
                            <th align="center"> Symbol </th>
                            <th align="center"> Shares </th>
                            <th align="center"> On Sale </th>
                            <th align="center"> Selling </th>
                            <th align="center"> Action </th>
                        </tr>
                    </thead>
                    <tbody>
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
                                )
                        }
                    </tbody>
                </table>
            </div>
         </>
    )
}

export default UserStocks