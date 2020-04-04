import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import RegisterCard from "../components/RegisterCard";

const Home = () => {
    const history = useHistory();
    const registerAsCustomer = () => history.push("/register-customer");
    const registerAsProvider = () => history.push("/register-provider");
    const signIn = () => history.push("/sign-in");
    const signUp = () => history.push("/sign-up");
    return (
        <div className="homeview-body">
            {/* <div className="register-container">
                <RegisterCard name={"Customer"} description={"You have some needs"} onClick={registerAsCustomer} />
                <RegisterCard name={"Provider"} description={"You have some printers"} onClick={registerAsProvider} />
            </div> */}
            <div className="sign-up-container">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={signUp}
                >
                    Sign up
                </Button>
            </div>
            <div className="login-container">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={signIn}
                >
                    Sign in
                </Button>
            </div>
        </div>
    );
}

export default Home