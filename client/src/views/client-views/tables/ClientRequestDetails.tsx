import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { IClientRequest } from "../../../common/types";
import * as React from "react";

export interface IClientRequestDetailsProps {
    selectedRequest: IClientRequest | undefined;
}

const ClientRequestDetails = (props: IClientRequestDetailsProps) => {
    return (
        <div className="current-request-details">
            {props.selectedRequest === undefined ? (
                <p>No selected requests!</p>
            ) : (
                    <div>
                        <div className="current-request-title">
                            <p>Request {props.selectedRequest.requestId}: Details</p>
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
                                        {props.selectedRequest.requestedProduct}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        {props.selectedRequest.requestedAmount}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        {props.selectedRequest.currentlyProvided}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                )}
        </div>
    );
}

export default ClientRequestDetails;
