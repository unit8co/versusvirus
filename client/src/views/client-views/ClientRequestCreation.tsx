import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { FormControl, Input, TextField, Paper, Button } from "@material-ui/core";
import * as ActionsUser from "../../common/actions";
import { UserActions } from "../../common/types";

export interface IClientRequestCreation {
    closePopUp: () => void;
}

const mapDispatcherToProps = (dispatch: Dispatch<UserActions>) => {
    return {
        disableCreationPopUpDisplay: () => dispatch(ActionsUser.closeRequestCreation()),
    };
};

type ReduxType = ReturnType<typeof mapDispatcherToProps>;

class ClientRequestCreationComponent extends React.PureComponent<IClientRequestCreation & ReduxType> {
    public render() {
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
                <Button color="secondary" variant="contained" onClick={this.closePopUp}>Close</Button>
            </Paper>
        )
    }

    private closePopUp = () => () => {
        this.props.disableCreationPopUpDisplay();
    }
}

export const ClientRequestCreation = connect(null, mapDispatcherToProps)(ClientRequestCreationComponent)