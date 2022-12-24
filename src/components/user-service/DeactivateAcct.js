import React, {useState} from "react";
import { TuseClient } from "../../tuse-client/TuseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { AiFillExclamationCircle } from "react-icons/ai";


const DeactivateAcct = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [input, setInput] = React.useState({
    username: "",
    password: ""
})

React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await TuseClient.get("user");
        setUser(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setUser]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.username !== input.username || user.password !== input.password) {
      toast.error("Error! Conditions for deactivation are not met. Invalid username or password");
    } else {
      try {
        const result = await TuseClient.put("user/deactivate");
          toast(`${result.data}`);
          localStorage.clear();
          setTimeout(() => {navigate("/")}, 5000);
      } catch (error) {
        console.log(error);
      }
    }
  };

return (
  <>
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
          marginLeft: "175px",
          marginTop: "15px",
        }}
      >
        DEACTIVATE YOUR ACCOUNT &nbsp;{<AiFillExclamationCircle style = {{color: "darkred", fontSize: "20px"}}/>}
      </Typography>
      <div style={{ marginLeft: "-2px", marginTop: "40px" }}>
        <form className="trade-form" autoComplete="off">
          <div className="manage-div">
            <input
              className="trade-input"
              type="text"
              placeholder="your username"
              value={input.username}
              onChange={(event) =>
                setInput({
                  ...input,
                  username: event.target.value,
                })
              }
            />
          </div>
          <div className="manage-div">
            <input
              className="trade-input"
              type="password"
              placeholder="your password"
              value={input.password}
              onChange={(event) =>
                setInput({
                  ...input,
                  password: event.target.value,
                })
              }
            />
          </div>
          <div>
            <button
            // disabled={!(value === 'deactivate')}
            className="orderButton" 
            onClick={handleSubmit}>
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
export default DeactivateAcct;
