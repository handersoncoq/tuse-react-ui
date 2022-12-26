import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { TuseClient } from "../tuse-client/TuseClient";
import { FaEnvelope } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate, useLocation } from "react-router-dom";

const MessageContent = () => {

  let [message, setMessage] = useState({});
  const navigate = useNavigate();
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search);
  const msgId = searchParams.get("msgId");

  const getMessageById = useCallback(async () => {
    if (localStorage.getItem("signIn")) {
      try {
        const msg = await TuseClient.get(`message/${msgId}`);
        setMessage(msg.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [msgId]);

  useEffect(() => {
    getMessageById();
    return () => {};
  }, [getMessageById]);

const date = new Date(message.date);
const formattedDate = date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit'
});

const dateString = formattedDate.slice(0, 10);
const timeString = formattedDate.slice(11, 20);

  return (
    <>
      <div style={{ marginTop: "30.1px" }}>
        <Header />
        <div style={{ height: "20px" }}></div>
      </div>

      <Card 
        style={{
          marginTop: "140px",
          height: "50px",
          width: "812px",
          marginLeft: "222px",
          backgroundColor: "#8d6f53",
          position: "fixed",
          cursor: "pointer"
        }}
        onClick = {()=>navigate("/inbox")}
      >
        <Typography 
          style={{
            marginLeft: "350px",
            marginTop: "15px",
            position: "fixed",
            color: "rgb(5, 51, 51)",
            fontSize: "20px"
          }}
        >
          {" "}
          INBOX <FaEnvelope color="darkred" />{" "}
        </Typography>
      </Card>

      <Navbar />

      <Card 
        style={{
          marginTop: "220px",
          height: "201px",
          width: "813px",
          marginLeft: "220px",
          backgroundColor: "transparent",
          display: "block",
        }}
       component="div">
        <Card
            style={{
              width: "600px",
              backgroundColor: "rgb(21, 22, 27)",
              marginTop: "15px",
              justifyContent: "center",
              marginLeft: "105px",
              color: "white",
              borderColor: "darkGrey",
              border: "solid",
              borderWidth: "0.01px",
              borderStyle: "onset",
            }}
        >
            <span>
              <span>
                <TiArrowBack 
                onClick = {()=>navigate("/inbox")}
                cursor="pointer"
                color="#8d6f53" 
                size="25px"
                />
              </span>
              <span style={{fontSize:"20px"}}>{message.title}</span>
              <span style={{marginLeft:"225px"}}>
                  {dateString} &nbsp;{" "}
                  {timeString}
              </span>
            </span>
            <hr style={{width:"580px", marginTop:"10px"}}></hr>
            <p style={{padding:"10px"}}>{message.content}</p>
        </Card>
      </Card>
    </>
  );
};

export default MessageContent;
