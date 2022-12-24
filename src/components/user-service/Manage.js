import React, {useState} from "react";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { TuseClient } from "../../tuse-client/TuseClient";
import UpdateProfile from "./UpdateProfile";
import DeactivateAcct from "./DeactivateAcct";

const Manage = ({updatedUsername}) => {

  const navigate = useNavigate();
  let [username, setUsername] = useState("");

  React.useEffect(() => {
    getCurrentUser()
  }, [username]);

  const getCurrentUser = async () =>{
    try{
      const currentUser = await TuseClient.get("user")
      setUsername(currentUser.data.username)
    }catch(e){
      console.log(e)
    }
  }

  React.useEffect(() => {
    if(updatedUsername){
      setUsername(updatedUsername)
    }
  }, [updatedUsername]);


  return (
    <>
      <div
        style={{ marginTop: "30.1px" }}
        onClick={() => {
        navigate("/");
        }}
      >
        <Header />
        <div style={{ height: "20px" }}></div>
      </div>
      <div
        style={{
          backgroundColor: "rgb(10, 11, 19)",
          height: "80px",
          position: "fixed",
          marginTop: "120px",
          width: "100%",
        }}
      ></div>
      <div>

        <div style={{ marginTop: "-40px", marginLeft: "150px" }}>
          <UpdateProfile />
        </div>

        <hr
        style={{ color: "white", marginTop: "30px", marginLeft: "200px"}}
        ></hr>

        <div style={{ marginTop: "-220px", marginLeft: "150px" }}>
          <DeactivateAcct />
        </div>
      </div>
      <Navbar />
    </>
  );
};
export default Manage;
