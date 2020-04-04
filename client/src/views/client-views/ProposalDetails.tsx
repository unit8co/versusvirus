import { Button, Card, CardContent, FormControl, Input, Typography, TextField } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IProposal } from "../../common/types";
import * as ActionsUser from "../../common/actions";
import { UserActions } from "../../common/types";

export interface IProposalDetailsProps {
    currentProposal: IProposal | undefined;
    closePopUp: () => void;
}

const mapDispatcherToProps = (dispatch: Dispatch<UserActions>) => {
    return {
        disableProposalDetailPopUpDisplay: () => dispatch(ActionsUser.closeProposalDetails()),
    };
};

type ReduxType = ReturnType<typeof mapDispatcherToProps>;

class ProposalDetailsComponent extends React.PureComponent<IProposalDetailsProps & ReduxType> {
    public render() {
        if (this.props.currentProposal) {
            return (
                <div className="proposal-detail-pop-up">
                        <div className="proposal-detail-info">
                            <Card className="proposal-detail-card">
                                <CardContent>
                                    <Typography className="label" color="textSecondary" gutterBottom>
                                        Provider
                                    </Typography>
                                    <Typography className="Value" variant="h5" component="h2">
                                        {this.props.currentProposal.username}
                                    </Typography>
                                    <Typography className="label" color="textSecondary" gutterBottom>
                                        Material
                                    </Typography>
                                    <Typography className="Value" variant="h5" component="h2">
                                        {this.props.currentProposal.material}
                                    </Typography>
                                    <Typography className="label" color="textSecondary" gutterBottom>
                                        Proposal quantity
                                    </Typography>
                                    <Typography className="Value" variant="h5" component="h2">
                                        {this.props.currentProposal.proposalQuantity}
                                    </Typography>
                                    <Typography className="label" color="textSecondary" gutterBottom>
                                        Reliability Score
                                    </Typography>
                                    <Typography className="Value" variant="h5" component="h2">
                                        {this.props.currentProposal.reliabilityScore}
                                    </Typography>
                                </CardContent>
                            </Card>

                        </div>
                        <div className="proposal-detail-order-placement">
                            <FormControl>
                                <TextField 
                                    id="filled-number"
                                    label="Wanted quantity"
                                    InputProps={{ inputProps: { min: 0, max: this.props.currentProposal.proposalQuantity } }}
                                    type="number"
                                />
                                <Input />
                            </FormControl>
                        </div>
                    <div className="close-button">
                        <Button color="secondary" variant="contained" onClick={this.closePopUp}>Close</Button>
                    </div>
                </div>
            )
        }
    }

    private closePopUp = () => () => {
        this.props.disableProposalDetailPopUpDisplay();
    }
}

export const ProposalDetails = connect(null, mapDispatcherToProps)(ProposalDetailsComponent);