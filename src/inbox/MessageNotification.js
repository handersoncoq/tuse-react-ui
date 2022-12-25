import React, {useState, useEffect} from "react";
import { TuseClient } from "../tuse-client/TuseClient";


const MessageNotification = () => {

    const [msgCount, setMsgCount] = useState(0);

    useEffect(() => {
        const getUserMessageCount = async () => {
          if (localStorage.getItem("signIn")) {
            try {
              const count = await TuseClient.get("message/count/unRead");
              setMsgCount(count.data);
            } catch (error) {
              // console.log(error)
            }
          }
        };
        getUserMessageCount();
      }, [msgCount]);

      return(
        <div
        style={{
            height: "16px",
            width: "16px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.5)",
            color: "green",
            fontSize: "10px",
            fontWeight: "bolder",
            textAlign: "center",
            justifyContent: "center"
        }}
        >{msgCount}</div>
      )

}
export default MessageNotification