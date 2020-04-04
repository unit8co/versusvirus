import { IProps } from "@blueprintjs/core";
import { Button, FormControl, Input, TextField } from "@material-ui/core";
import * as React from "react";
import { ConsumerRegisterForm } from "./forms/ConsumerRegisterForm";
import { ProviderRegisterForm } from "./forms/ProviderRegisterForm"

export enum USER_TYPES {
    PROVIDER = "Provider",
    CONSUMER = "Consumer",
}

export interface IRegisterViewProps extends IProps {

}

export interface IRegisterViewState {
    userType: USER_TYPES;
}

export class RegisterForm extends React.PureComponent<IRegisterViewProps, IRegisterViewState> {
    public state = {
        userType: USER_TYPES.CONSUMER,
    }

    public render() {
        return (
            <div className="register-container">
                <div>
                    <div className="body-container">
                        <Button 
                            variant={this.state.userType === USER_TYPES.CONSUMER ? "contained" : "outlined"}
                            color="primary"
                            onClick={this.updateState(USER_TYPES.CONSUMER)}
                        >
                            Consumer
                        </Button>
                        <Button 
                            variant={this.state.userType === USER_TYPES.PROVIDER ? "contained" : "outlined"}
                            color="primary"
                            onClick={this.updateState(USER_TYPES.PROVIDER)}
                        >
                            Provider
                        </Button>
                    </div>
                </div>
                <FormControl>
                    <TextField 
                        id="username_input"
                        label="Username"
                        type="required"
                        variant="filled"
                    />
                    <TextField 
                        id="email_input"
                        label="Email Address"
                        type="required"
                        variant="filled"
                    />
                    <TextField
                        id="password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="filled"
                    />
                    <TextField
                        id="password-confirmation"
                        label="Password Confirmation"
                        type="password"
                        autoComplete="current-password"
                        variant="filled"
                    />
                    {/* {this.state.userType === USER_TYPES.CONSUMER && (
                        <ConsumerRegisterForm></ConsumerRegisterForm>
                    )}
                    {this.state.userType === USER_TYPES.PROVIDER && (
                        <ProviderRegisterForm></ProviderRegisterForm>
                    )} */}
                </FormControl>
            </div>
        )
    };

    private updateState = (newState: USER_TYPES) => () => this.setState({ userType: newState});
}