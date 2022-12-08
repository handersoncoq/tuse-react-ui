import React from "react";
import { TuseClient } from "../../tuse-client/TuseClient";

const SignOut = () =>{

    const onClick = async (e) =>{
            try {
                const result = await TuseClient.delete("auth")
                localStorage.clear();
                alert(result.data)
            } catch (error) {
                console.log(error)
            }
        }

    return(

            <div>
                <a href="/" style={{cursor: "pointer"}} onClick={onClick}>Sign Out</a>
            </div>
    )
}
export default SignOut