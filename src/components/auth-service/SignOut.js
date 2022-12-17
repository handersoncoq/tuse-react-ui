import React from "react";
import { TuseClient } from "../../tuse-client/TuseClient";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignOut = () =>{

    const navigate = useNavigate()

    const onClick = async (e) =>{
            try {
                const result = await TuseClient.delete("auth")
                localStorage.clear();
                console.log(`${result.data}`);
                navigate("/")
            } catch (error) {
                console.log(error)
            }
        }

    return(

            <div>
                <span 
                onClick={onClick}
                style={{color: "rgb(15, 16, 26)", display: "float", marginLeft: "30px", cursor: "pointer", fontWeight: "normal"}}
                ><span>
                    <FaSignOutAlt style={{color: "white", display: "float"}}/>
                </span>
                Sign Out
                </span>
            </div>
    )
}
export default SignOut