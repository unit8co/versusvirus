import { Card, CardContent, FormControl, Input, Typography, TextField } from "@material-ui/core";
import * as React from "react";
import { IProposal } from "../../common/types";

export class ProposalDetails extends React.PureComponent<IProposal> {
    public render() {
        return (
            <div className="proposal-detail-pop-up">
                <div className="proposal-detail-info">
                    <Card className="proposal-detail-card">
                        <CardContent>
                            <Typography className="label" color="textSecondary" gutterBottom>
                                Provider
                            </Typography>
                            <Typography className="Value" variant="h5" component="h2">
                                {this.props.username}
                            </Typography>
                            <Typography className="label" color="textSecondary" gutterBottom>
                                Material
                            </Typography>
                            <Typography className="Value" variant="h5" component="h2">
                                {this.props.material}
                            </Typography>
                            <Typography className="label" color="textSecondary" gutterBottom>
                                Proposal quantity
                            </Typography>
                            <Typography className="Value" variant="h5" component="h2">
                                {this.props.proposalQuantity}
                            </Typography>
                            <Typography className="label" color="textSecondary" gutterBottom>
                                Reliability Score
                            </Typography>
                            <Typography className="Value" variant="h5" component="h2">
                                {this.props.reliabilityScore}
                            </Typography>
                        </CardContent>
                    </Card>

                </div>
                <div className="proposal-detail-order-placement">
                    <FormControl>
                        <TextField 
                            id="filled-number"
                            label="Wanted quantity"
                            InputProps={{ inputProps: { min: 0, max: this.props.proposalQuantity } }}
                            type="number"
                        />
                        <Input />
                    </FormControl>
                </div>
            </div>
        )
    }
}