import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { IClientRequest } from "../../common/types";
import * as React from "react";

export interface IRequestPreviewTableProps {
    clientRequests: IClientRequest[];
}

export class RequestsPreviewTable extends React.PureComponent<IRequestPreviewTableProps> {
    public render() {
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
                    {this.props.clientRequests
                        .map((request: IClientRequest) => (
                            <TableRow>
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
}