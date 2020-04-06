import { FormControl, TextField, Button } from "@material-ui/core";
import * as firebase from "firebase/app";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


const SignUp = () => {
    const Alert = (props: AlertProps) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const [username, setUsername] = useState(undefined as unknown as string);
    const [password, setPassword] = useState(undefined as unknown as string);
    const [error, setError] = useState(undefined as unknown as string);
    const history = useHistory();

    const signUp = () => {
        firebase.auth().createUserWithEmailAndPassword(username, password).then(e => {
            console.log(e);
            history.push("/protected")
        }, e => {
            setError(e.message);
        })
    }
    return (
        <div className="sign-in-container">
            <Snackbar open={error !== undefined} autoHideDuration={2000}>
                <Alert severity="error">
                    {error}
                </Alert>
            </Snackbar>
            <FormControl>
                <TextField
                    id="user_mail_input"
                    value={username}
                    onChange={(e) => setUsername(e.currentTarget.value)}
                    label="Mail Address"
                    type="required"
                />
                <TextField
                    id="password-input"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
            </FormControl>

            <Button onClick={signUp}>
                Sign up
            </Button>
        </div>
    )

};

export default SignUp;