import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { IClientRequest } from "../../common/types";
import * as React from "react";

export interface IClientRequestDetailsProps {
    selectedRequest: IClientRequest | undefined;
}

export class ClientRequestDetails extends React.PureComponent<IClientRequestDetailsProps> {
    public render() {
        return (
            <div className="current-request-details">
                {this.props.selectedRequest === undefined ? (
                    <p>No selected requests!</p>
                ) : (
                    <div>
                        <div className="current-request-title">
                            <p>Request {this.props.selectedRequest.requestId}: Details</p>
                        </div>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Requested Product
                                    </TableCell>
                                    <TableCell>
                                        Requested Amount
                                    </TableCell>
                                    <TableCell>
                                        Currently provided
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        {this.props.selectedRequest.requestedProduct}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        {this.props.selectedRequest.requestedAmount}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        {this.props.selectedRequest.currentlyProvided}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        );
    }
}
