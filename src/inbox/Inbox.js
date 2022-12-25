import React, { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { TuseClient } from "../tuse-client/TuseClient";
import { CiRead, CiUnread } from "react-icons/ci";
import { FaEnvelope } from "react-icons/fa";

const Inbox = () => {
  let [inbox, setInbox] = useState([]);
  let [isClicked, setIsClicked] = useState(false);

  React.useEffect(() => {
    getCurrentUserInbox();
  }, []);

  const getCurrentUserInbox = async () => {
    if (localStorage.getItem("signIn")) {
      try {
        const userInbox = await TuseClient.get("message");
        setInbox(userInbox.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setMessageToRead = (msgId) => {
    try {
      TuseClient.put(`message/isRead/${msgId}`);
      setIsClicked(!isClicked);
      getCurrentUserInbox();
    } catch (error) {
      console.log(error);
    }
  };

  // const displayMessage = (msgContent) => {
  //     return <Card><p>{msgContent}</p></Card>
  // }

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
        }}
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
          INBOX <FaEnvelope color = "darkred"/>{" "}
        </Typography>
      </Card>

      <Navbar />

      <Card
        style={{
          marginTop: "220px",
          height: "201px",
          width: "813px",
          marginLeft: "220px",
          backgroundColor: "#bca085",
          display: "block",
          overflowY: "scroll",
        }}
        component="div"
      >
        {inbox.map((msg) => (
          <div key={msg.messageId}>
            <Card
                onClick={() => {
                setMessageToRead(msg.messageId);
              }}
              style={{
                height: "45px",
                width: "600px",
                backgroundColor: "#8d6f53",
                marginTop: "20px",
                cursor: "pointer",
                justifyContent: "center",
                marginLeft: "105px",
                marginBottom: "-10px",
              }}
            >
              {!msg.read ? (
                <div>
                  <div
                    style={{ backgroundColor: "transparent", padding: "4px"}}
                  >
                    <Typography fontSize="11px" color="white">
                    {msg.date.slice(0, 10)} &nbsp; {msg.date.slice(11, 16)}
                    </Typography>
                    <Typography fontSize="14px">{msg.title} &nbsp;&nbsp;&nbsp;&nbsp;
                    <CiUnread color= "darkred"/> 
                    </Typography>
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    style={{ backgroundColor: "transparent", padding: "4px"}}
                  >
                    <Typography fontSize="11px" color="white">
                        {msg.date.slice(0, 10)} &nbsp; {msg.date.slice(11, 16)}
                    </Typography>
                    <Typography fontSize="14px">{msg.title}&nbsp;&nbsp;&nbsp;&nbsp;
                    <CiRead color= "#034545"/>
                    </Typography>
                  </div>
                </div>
              )
              }
            </Card>
            {isClicked ? (
                    <Card
                      style={{
                        width: "600px",
                        backgroundColor: "rgb(10, 11, 19)",
                        marginTop: "15px",
                        cursor: "pointer",
                        justifyContent: "center",
                        marginLeft: "105px",
                        color: "white",
                        borderColor: "white",
                        border: "solid",
                        borderWidth: "0.1px",
                      }}
                    >
                      <p>{msg.content}</p>
                    </Card>
                  ) : (
                    ""
                  )}
          </div>
        ))}
      </Card>
    </>
  );
};

export default Inbox;
