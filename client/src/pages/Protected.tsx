import React, { useState } from "react";
import Register from "./Register";
import { Redirect, useHistory } from "react-router";
import {
    FirebaseAuthConsumer
} from "@react-firebase/auth";
import ProviderRegisterForm from "../views/forms/ProviderRegisterForm";

const Protected = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [registration, setRegistration] = useState(undefined as unknown as string);
    const history = useHistory();

    const checkRegistration = () => {
        return Promise.resolve("unknown").then(e => {
            setIsLoading(false);
            setRegistration(e);
        });
    }
    checkRegistration();

    return (
        <FirebaseAuthConsumer>
            {({ isSignedIn, user, providerId }) => {
                console.log(user);
                if (!isSignedIn) {
                    return <Redirect to="/sign-in" />
                } else {
                    return (
                        <div>
                            { isLoading 
                                ? <span>Loading</span>
                                : registration === "unknown"
                                    ? <Register />
                                    : <div>Home</div>
                            }
                        </div>
                    )
                }
            }}
        </FirebaseAuthConsumer>
    )
}

export default Protected;