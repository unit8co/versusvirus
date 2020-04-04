import * as React from "react";
import TextField from '@material-ui/core/TextField';

export interface IState {
    printer: string | null;
    experience: string;
    hasPetG: boolean;
    abs: boolean;
    pla: boolean;
}

export class ProviderRegisterForm extends React.PureComponent<{}, IState> {
    state = {
        printer: null,
        experience: "hobby",
        hasPetG: false,
        abs: false,
        pla: false
    }

    public render() {
        return (
            <div className="provider-register-form">
                <TextField
                    label="Printer"
                    defaultValue="Printer model"
                    value={this.state.printer} 
                    onChange={(e) => this.setState({ printer: e.currentTarget.value })} />

            </div>
        );
    }
}