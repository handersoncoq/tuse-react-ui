import React from "react";
import { TuseClient } from "../../tuse-client/TuseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { GrDocumentUpdate } from "react-icons/gr";

const UpdateProfile = (props) => {

  let [username, setUsername] = React.useState("");
  let [password, setPassword] = React.useState("");
  const [updateRequest, setUpdateRequest] = React.useState({
    username: "",
    password: ""
})

React.useEffect(() => {
  getCurrentUser()
}, [username]);


const getCurrentUser = async () =>{
  try{
    const currentUser = await TuseClient.get("user")
    setUsername(currentUser.data.username)
    setPassword(currentUser.data.password)
  }catch(e){
    console.log(e)
  }
}

const handleSubmit = async (e) =>{
    e.preventDefault()
    if(updateRequest.username  || updateRequest.password){
      if(updateRequest.username === username || updateRequest.password === password){
        toast.info("No change was made: username or password is the same");
        return;
      }
        try {
            const result = await TuseClient.put("user/update", updateRequest);
            toast.info(`${result.data}`);
            getCurrentUser();
            setUpdateRequest({
              ...updateRequest,
              username: "",
              password: ""})
        } catch (error) {
            console.log(error)
        }
    } else{
        toast.error("Please update at least one field")
    }
}

return (
  <>
    <div
          style={{
            justifyContent: "center",
            marginTop: "-60px",
            marginLeft: "-65px",
            backgroundColor: "white",
            width: "100%",
            display: "flex",
            position: "fixed",
          }}
        >
          <span style={{ color: "rgb(10, 11, 19)" }}> Managing Your Account: </span>
          <span style={{ color: "red" }}> {username} </span>
        </div>
    <Card
      style={{
        marginTop: "250px",
        marginLeft: "190px",
        height: "200px",
        width: "550px",
        backgroundColor: "#8d6f53",
      }}
    >
      {" "}
      <Typography
        style={{
          marginLeft: "170px",
          marginTop: "15px",
        }}
      >
        UPDATE YOUR PROFILE &nbsp;&nbsp;{<GrDocumentUpdate style = {{color: "#034545"}} />}
      </Typography>
      <div style={{ marginLeft: "-2px", marginTop: "40px" }}>
        <form className="trade-form" autoComplete="off">
          <div className="manage-div">
            <input
              className="trade-input"
              type="text"
              placeholder="new username"
              value={updateRequest.username}
              onChange={(event) =>
                setUpdateRequest({
                  ...updateRequest,
                  username: event.target.value,
                })
              }
            />
          </div>
          <div className="manage-div">
            <input
              className="trade-input"
              type="password"
              placeholder="new password"
              value={updateRequest.password}
              onChange={(event) =>
                setUpdateRequest({
                  ...updateRequest,
                  password: event.target.value,
                })
              }
            />
          </div>
          <div>
            <button className="orderButton" onClick={handleSubmit}>
              <Typography sx={{ fontSize: 16, color: "white" }}>
                SUBMIT
              </Typography>
            </button>
          </div>
        </form>
      </div>
    </Card>
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
  </>
);
};
export default UpdateProfile;
