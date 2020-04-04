import * as React from "react";
import { FormControl, Input, TextField } from "@material-ui/core";

export class ClientRequestCreation extends React.PureComponent {
    public render() {
        return (
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
        )
    }
}