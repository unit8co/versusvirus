import { FormControl, TextField } from "@material-ui/core";
import * as React from "react";


export class LoginForm extends React.PureComponent {

    public render() {
        return (
            <div className="register-container">
                <FormControl>
                    <TextField 
                        id="username_input"
                        label="Username"
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
                </FormControl>
            </div>
        )
    };
}