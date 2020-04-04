import { Button } from "@material-ui/core";
import * as React from "react";
import { RegisterForm } from "./register";
import { LoginForm } from "./login"

export enum HOME_DISPLAY {
    REGISTER = "Register",
    LOG_IN = "Log in"
}

export interface IHomePageState {
    homeDisplay: HOME_DISPLAY | undefined;
}

export interface IHomePageProps {
}

export class HomeView extends React.PureComponent<IHomePageProps, IHomePageState> {
    public state = {
        homeDisplay: undefined,
    };

    public render() {
        return (
            <div className="homeview-body">
                <div className="body-container">
                    <p className="greeting-text">
                        Welcome on the login page of our project!<br />
                        If you don't have an account, click on the Register button below.<br /> 
                        Else, use the login to access your account!<br />
                    </p>
                </div>
                <div className="body-container">
                    <Button 
                        variant="contained"
                        color="primary"
                        onClick={this.changeHomeDisplay(HOME_DISPLAY.REGISTER)}
                    >
                        Register!
                    </Button>
                </div>
                <div className="body-container">
                    <Button 
                        variant="contained" 
                        color="secondary"
                        onClick={this.changeHomeDisplay(HOME_DISPLAY.LOG_IN)}
                    >
                        Log in
                    </Button>
                </div>
                <div>
                    {this.state.homeDisplay === HOME_DISPLAY.REGISTER && (
                        <RegisterForm></RegisterForm>
                    )}
                    {this.state.homeDisplay === HOME_DISPLAY.LOG_IN && (
                        <LoginForm></LoginForm>
                    )}
                </div>
            </div>
        )
    };

    private changeHomeDisplay = (newDisplay: HOME_DISPLAY) => () => this.setState({ homeDisplay: newDisplay});
}