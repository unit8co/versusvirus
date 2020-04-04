import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { createCustomer } from "../../api/api";
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router";


const ConsumerRegisterForm = ({ user }: { user: any}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [officialName, setOfficialName] = useState("");
    const history = useHistory();

    const register = () => {
        setIsLoading(true);
        createCustomer({
            userId: user.uid,
            name: officialName
        }).then(() => history.push("/home"))
    }
    return (
        <div className="consumer-register-form">
            <p>Request requires approval</p>
            <TextField
                label="Official name"
                defaultValue="Official name"
                value={officialName}
                onChange={(e) => setOfficialName(e.currentTarget.value)} />

            <Button onClick={register}>Register</Button>
        </div>
    );
}

export default ConsumerRegisterForm;