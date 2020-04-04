import * as React from "react";
import { FormControl, Input, TextField, Paper, Button } from "@material-ui/core";

export interface IClientRequestCreation {
    closePopUp: () => void;
}

const ClientRequestCreationComponent = (props: IClientRequestCreation) => {
    return (
        <Paper elevation={3}>
            <FormControl>
                <TextField
                    id="requested-product-input"
                    label="Product"
                    type="required"
                    variant="filled"
                />
                <TextField
                    id="requested-amount-input"
                    label="Product"
                    type="required"
                    variant="filled"
                />
                <Input id="my-input" />
            </FormControl>
            <Button color="secondary" variant="contained" onClick={props.closePopUp}>Close</Button>
        </Paper>
    )
}

export default ClientRequestCreationComponent;