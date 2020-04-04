import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
    const history = useHistory();
    const signIn = () => history.push("/sign-in");
    const signUp = () => history.push("/sign-up");
    return (
        <div className="homeview-body">
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