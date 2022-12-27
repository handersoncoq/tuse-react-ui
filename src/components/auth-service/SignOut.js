import React from "react";
import { TuseClient } from "../../tuse-client/TuseClient";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignOut = () =>{

    const navigate = useNavigate()

    const onClick = async (e) =>{
            try {
                await TuseClient.delete("auth")
                localStorage.clear();
                setTimeout(() => {navigate("/")}, 5000);
                // window.location.reload(false);
            } catch (error) {
                console.log(error)
            }
        }

    return(

            <div>
                <span 
                onClick={onClick}
                style={{color: "#8d6f53", display: "float", marginLeft: "30px", cursor: "pointer", fontWeight: "normal"}}
                ><span>
                    <FaSignOutAlt style={{color: "white", display: "float"}}/>
                </span >
                <span className="signOut">Sign Out</span>
                </span>
            </div>
    )
}
export default SignOut