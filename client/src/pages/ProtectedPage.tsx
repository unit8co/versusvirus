import React from "react";
import { Redirect, useHistory } from "react-router";
import {
    FirebaseAuthConsumer
} from "@react-firebase/auth";

const ProtectedPage = (Component: any) => {
    return (props: any) => (
        <FirebaseAuthConsumer>
            {({ isSignedIn, user }) => {
                console.log(user);
                if (!isSignedIn) {
                    return <Redirect to="/sign-in" />
                } else {
                    return <Component {...props} user={user} />
                }
            }}
        </FirebaseAuthConsumer>
    );
}

export { ProtectedPage }