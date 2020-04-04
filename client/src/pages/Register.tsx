import React from "react";
import RegisterCard from "../components/RegisterCard";
import { useHistory } from "react-router";

const Register = () => {
    const history = useHistory();
    const registerAsCustomer = () => history.push("/register-customer");
    const registerAsProvider = () => history.push("/register-provider");

    return ( 
        <div className="register-container">
            <RegisterCard name={"Customer"} description={"You have some needs"} onClick={registerAsCustomer} />
            <RegisterCard name={"Provider"} description={"You have some printers"} onClick={registerAsProvider} />
        </div>
    )
}

export default Register;