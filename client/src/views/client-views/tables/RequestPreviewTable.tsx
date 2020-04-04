import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { IClientRequest } from "../../../common/types";
import React from "react";

export interface IRequestPreviewTableProps {
    clientRequests: IClientRequest[];
    changeCurrentRequest: (request: IClientRequest) => void;
}

const RequestsPreviewTableComponent = (props: IRequestPreviewTableProps) => {
    return (
        <div className="client-requests-preview">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            My Requests
                            </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.clientRequests
                        .map((request: IClientRequest) => (
                            <TableRow onClick={() => props.changeCurrentRequest(request)}>
                                <TableCell>
                                    {request.requestId}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default RequestsPreviewTableComponent;