import React, { useState, useEffect, useCallback, useMemo } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { TuseClient } from "../tuse-client/TuseClient";
import { CiRead, CiUnread } from "react-icons/ci";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Inbox = () => {
  let [inbox, setInbox] = useState([]);
  const navigate = useNavigate();

  const getCurrentUserInbox = useCallback(async () => {
    if (localStorage.getItem("signIn")) {
      try {
        const userInbox = await TuseClient.get("message");
        setInbox(userInbox.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const setMessageToRead = useCallback(
    async (msgId) => {
      try {
        await TuseClient.put(`message/isRead/${msgId}`);
        getCurrentUserInbox();
        navigate(`/msgContent?msgId=${msgId}`);
      } catch (error) {
        console.log(error);
      }
    },
    [getCurrentUserInbox, navigate]
  );

  useEffect(() => {
    getCurrentUserInbox();
    return () => {};
  }, [getCurrentUserInbox, navigate]);

  const formatDate = (date) => {
    return (
      <span
        style={{
          marginLeft: "280px",
          color: "white",
          fontSize: "13px",
        }}
      >
        {new Date(date)
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
          .slice(0, 10)}{" "}
        &nbsp;{" "}
        {new Date(date)
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
          .slice(11, 20)}
      </span>
    );
  };

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
            fontSize: "20px",
          }}
        >
          {" "}
          INBOX <FaEnvelope color="darkred" />{" "}
        </Typography>
      </Card>

      <Navbar />

      <div
        style={{
          marginTop: "220px",
          height: "201px",
          width: "813px",
          marginLeft: "220px",
          backgroundColor: "rgb(21, 22, 27)",
          display: "block",
          overflowY: "scroll",
          borderColor: "darkGrey",
          border: "solid",
          borderWidth: "0.01px",
          borderStyle: "onset",
          borderRadius: "7px"
        }}
      >
        {useMemo(
          () =>
            inbox.map((msg) => (
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
                        style={{
                          backgroundColor: "transparent",
                          padding: "4px",
                        }}
                      >
                        <span fontSize="14px">
                          {msg.title} &nbsp;&nbsp;&nbsp;&nbsp;
                          <CiUnread color="darkred" />
                        </span>
                        {formatDate(msg.date)}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div
                        style={{
                          backgroundColor: "transparent",
                          padding: "4px",
                        }}
                      >
                        <span fontSize="14px">
                          {msg.title}&nbsp;&nbsp;&nbsp;&nbsp;
                          <CiRead color="#034545" size="20px" />
                        </span>
                        {formatDate(msg.date)}
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            )),
          [inbox, setMessageToRead]
        )}
      </div>
    </>
  );
};

export default Inbox;
