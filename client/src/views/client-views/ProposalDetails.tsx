import { Button, Card, CardContent, FormControl, Input, Typography, TextField } from "@material-ui/core";
import * as React from "react";
import { IProposal } from "../../common/types";
import * as ActionsUser from "../../common/actions";
import { UserActions } from "../../common/types";

export interface IProposalDetailsProps {
    currentProposal: IProposal | undefined;
    closePopUp: () => void;
}

const ProposalDetailsComponent = (props: IProposalDetailsProps) => {
        if (props.currentProposal != null) {
            return (
                <div className="proposal-detail-pop-up">
                        <div className="proposal-detail-info">
                            <Card className="proposal-detail-card">
                                <CardContent>
                                    <Typography className="label" color="textSecondary" gutterBottom>
                                        Provider
                                    </Typography>
                                    <Typography className="Value" variant="h5" component="h2">
                                        {props.currentProposal.username}
                                    </Typography>
                                    <Typography className="label" color="textSecondary" gutterBottom>
                                        Material
                                    </Typography>
                                    <Typography className="Value" variant="h5" component="h2">
                                        {props.currentProposal.material}
                                    </Typography>
                                    <Typography className="label" color="textSecondary" gutterBottom>
                                        Proposal quantity
                                    </Typography>
                                    <Typography className="Value" variant="h5" component="h2">
                                        {props.currentProposal.proposalQuantity}
                                    </Typography>
                                    <Typography className="label" color="textSecondary" gutterBottom>
                                        Reliability Score
                                    </Typography>
                                    <Typography className="Value" variant="h5" component="h2">
                                        {props.currentProposal.reliabilityScore}
                                    </Typography>
                                </CardContent>
                            </Card>

                        </div>
                        <div className="proposal-detail-order-placement">
                            <FormControl>
                                <TextField 
                                    id="filled-number"
                                    label="Wanted quantity"
                                    InputProps={{ inputProps: { min: 0, max: props.currentProposal.proposalQuantity } }}
                                    type="number"
                                />
                                <Input />
                            </FormControl>
                        </div>
                    <div className="close-button">
                        <Button color="secondary" variant="contained" onClick={props.closePopUp}>Close</Button>
                    </div>
                </div>
            )
    } else {
        return null;
    }
}

export default ProposalDetailsComponent;