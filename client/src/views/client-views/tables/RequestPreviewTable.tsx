import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { IClientRequest} from "../../../common/types";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as ActionsUser from "../../../common/actions";
import { UserActions } from "../../../common/types";

export interface IRequestPreviewTableProps {
    clientRequests: IClientRequest[];
    changeCurrentRequest: (_: IClientRequest) => void;
}

const mapDispatcherToProps = (dispatch: Dispatch<UserActions>) => {
    return {
        setCurrentRequest: (newRequest: IClientRequest) => dispatch(ActionsUser.changeSelectedRequest(newRequest)),
    };
};

type ReduxType = ReturnType<typeof mapDispatcherToProps>;

class RequestsPreviewTableComponent extends React.PureComponent<IRequestPreviewTableProps & ReduxType> {
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
                            <TableRow
                                onClick={this.changeCurrentRequest(request)}
                            >
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

    private changeCurrentRequest = (newRequest: IClientRequest) => () => {
        this.props.setCurrentRequest(newRequest);
    }
}

export const RequestsPreviewTable = connect(null, mapDispatcherToProps)(RequestsPreviewTableComponent);