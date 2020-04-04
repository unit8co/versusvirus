import React from "react";
import { Redirect } from "react-router";
import {
    FirebaseAuthConsumer
} from "@react-firebase/auth";

const Protected = () => {
    return (
        <FirebaseAuthConsumer>
            {({ isSignedIn, user, providerId }) => {
                console.log(user);
                if (!isSignedIn) {
                    return <Redirect to="/sign-in" />
                } else {
                    return (
                        <div>
                            {`Hello ${user.email}`}
                        </div>
                    )
                }
            }}
        </FirebaseAuthConsumer>
    )
}

export default Protected;