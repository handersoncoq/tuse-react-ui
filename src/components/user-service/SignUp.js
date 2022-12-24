import React, { useState } from "react";
import { TuseClient } from "../../tuse-client/TuseClient";
import Header from "../Header";
import Navbar from "../Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";


const SignUp = () =>{

    const [user, setUser] = useState({
        username: "",
        password: "",
    })

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(!user.username || !user.password){
            toast.error("Please fill out all fields")  
        } else{
            if(user.username.length > 12) {
              toast.info("Username is too long. Please choose a shorter one")
              return;
            }
            try {
                const result = await TuseClient.post("user", user)
                toast.info(`${result.data}`)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
          <div style={{ marginTop: "30.1px" }}>
            <Header />
            <div style={{ height: "20px" }}></div>
          </div>
          <Navbar />
          <Card
          style={{
            marginTop: "180px",
            height: "220px",
            width: "600px",
            marginLeft: "325px",
            position: "fixed",
            backgroundColor: "#8d6f53",
          }}
          > 
              <Card
              style={{
                width: 90,
                height: 90,
                marginLeft: "262px",
                backgroundColor: "#8f7358",
                borderRadius: '50%',
                position: "fixed",
                marginTop: "-20px",
              }}
              >
                  <Typography
                  sx={{ fontSize: 16, color: "rgb(5, 51, 51)", marginTop: "20px" }}
                        align="center"
                        gutterBottom
                  >SIGN UP</Typography>
                  <div
                    style={{
                      marginTop: "-50px",
                      marginLeft: "-55px",
                    }}
                  >
                    <img
                      src="tuse-trademark.png"
                      alt="Tuse Trademark"
                    />
                  </div>
              </Card>
              <div style={{ marginLeft: "-2px", marginTop: "40px" }}>
                <form className="formInput"
                autoComplete="off"
                >
                  <div className="div">
                    <input
                      className="orderInput"
                      type="text"
                      placeholder="username"
                      value={user.username}
                      onChange={(event) =>
                        setUser({ ...user, username: event.target.value })
                      }
                    />
                  </div>
                  <div className="div">
                    <input
                      className="orderInput"
                      type="password"
                      placeholder="password"
                      value={user.password}
                      onChange={(event) =>
                        setUser({ ...user, password: event.target.value })
                      }
                    />
                  </div>
                  <div>
                    <button className="orderButton" onClick={handleSubmit}>
                      <Typography
                      sx={{ fontSize: 16, color: "white"}}
                      >SUBMIT</Typography>
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
}
export default SignUp