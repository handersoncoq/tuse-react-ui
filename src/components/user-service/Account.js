import * as React from 'react';
import { TuseClient } from "../../tuse-client/TuseClient";
import { AiOutlineStock } from "react-icons/ai";
import Header from "../Header";
import Navbar from "../Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Account = () =>{

    const [updateRequest, setUpdateRequest] = React.useState({
        username: "",
        password: ""
    })


    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(updateRequest.username  || updateRequest.password){
            try {
                const result = await TuseClient.put("user/update", updateRequest)
                toast.info(`${result.data}`)
            } catch (error) {
                console.log(error)
            }
        } else{
            toast.error("Please update at least one field")
        }
    }

    return(
        <>  
            <div style={{marginTop: "30.1px"}}>
                <Header/>
                <div style={{height: "20px"}}></div>
            </div>

            <div className="Sign">
                <h1> - The Universal Stock Exchange {<AiOutlineStock style={{color: "darkcyan"}}/>}</h1>
            </div>
            <div style={{marginTop: "190px"}}>
                <span className="globalSpan">
                        <span style={{color: "darkcyan", fontWeight: "650", fontSize: "larger"}}> UPDATE YOUR ACCOUNT </span>
                </span>
            </div>
            <Navbar />
                <div>
                    <form className="formInput">
                        <div className="div">
                            <label>Username</label>
                            <input
                            className="orderInput"
                            type="text"
                            placeholder="coolUser@1"
                            value={updateRequest.username}
                            onChange={(event) => setUpdateRequest({ ...updateRequest, username: event.target.value })}
                            />
                        </div>
                        <div className="div">
                            <label>Password</label>
                            <input
                            className="orderInput"
                            type="password"
                            placeholder="strongPass123"
                            value={updateRequest.password}
                            onChange={(event) => setUpdateRequest({ ...updateRequest, password: event.target.value })}
                            />
                        </div>
                        <div>
                            <button className="orderButton" onClick={handleSubmit}>Submit</button>
                        </div>
                    </form>
                    <ToastContainer 
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                </div>
        </>
    )


}
export default Account