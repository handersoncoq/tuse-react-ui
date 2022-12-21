import React, { useState } from "react";
import Header from "../Header";
import Navbar from "../Navbar";
import Portfolio from "./Portfolio";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { TuseClient } from "../../tuse-client/TuseClient";
import { BsEmojiSmile } from "react-icons/bs";
import UserStocks from "./UserStocks";

const DashBoard = () => {

    let [username, setUsername] = useState("");
    const navigate = useNavigate()

    React.useEffect( () =>{
        const getCurrentUser = async () =>{
            if(localStorage.getItem("signIn")){
                try {
                const user = await TuseClient.get("user")
                setUsername(user.data.username)
            } catch (error) {
                // console.log(error)
            }}
        }
        getCurrentUser();
    }, [setUsername])

    return(
        <>
            <div style={{marginTop: "30.1px"}}>
                <Header/>
                <div style={{height: "20px"}}></div>
            </div>

            <Card
            style={{
                marginTop: "140px",
                height: "50px",
                width: "800px",
                marginLeft: "228px",
                backgroundColor: "#8d6f53",
                position: "fixed"
              }}
            >
                <div
                style={{
                    marginTop: "-20px",
                    marginLeft: "25px",
                    position: "fixed"
                  }}
                >
                    <img
                    onClick = {() =>navigate("/")}
                    src="tuse-trademark.png"
                    alt="Tuse Trademark"
                    />
                </div>
                <Typography
                style={{
                    marginLeft: "330px",
                    marginTop: "15px",
                    position: "fixed",
                    color: "rgb(5, 51, 51)"
                }}
                >Hi, ${username} <BsEmojiSmile/> </Typography>
                <div
                style={{
                    marginTop: "-20px",
                    marginLeft: "585px",
                    position: "fixed"
                  }}
                >
                    <img
                    onClick = {() =>navigate("/")}
                    src="tuse-trademark.png"
                    alt="Tuse Trademark"
                    />
                </div>
            </Card>
  
            <Navbar />
            <Portfolio /> 
            <div
            style={{
                marginLeft: "465px",
                marginTop: "-390px"
            }}
            >
            <UserStocks /> 
            </div>
            <Typography
            style={{
                marginLeft: "555px",
                marginTop: "55px"
            }}
            >More Coming Soon!</Typography>
         </>
    )
}

export default DashBoard