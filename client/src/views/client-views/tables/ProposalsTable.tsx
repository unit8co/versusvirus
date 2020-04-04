import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IClientRequest, IProposal } from "../../../common/types";
import * as ActionsUser from "../../../common/actions";
import { UserActions } from "../../../common/types";

export interface IProposalsTableProps {
    proposals: IProposal[];
    selectProposal: (_: IProposal) => void;
}

export interface IProposalsTableState {
    currentClientRequest: IClientRequest;
}

const mapDispatcherToProps = (dispatch: Dispatch<UserActions>) => {
    return {
        setCurrentRequest: (newProposal: IProposal) => dispatch(ActionsUser.changeSelectedProposal(newProposal)),
    };
};

type ReduxType = ReturnType<typeof mapDispatcherToProps>;


class ProposalsTableComponent extends React.PureComponent<IProposalsTableProps, IProposalsTableState > {
    public render() {
        return (
            <div className="proposals-table">
                {this.props.proposals.length > 0 && (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Username
                                </TableCell>
                                <TableCell>
                                    Material
                                </TableCell>
                                <TableCell>
                                    Proposed quantity
                                </TableCell>
                                <TableCell>
                                    Reliability
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.props.proposals
                            .map((proposal: IProposal) => {
                                proposal.requestId === this.state.currentClientRequest.requestId ? (
                                    <TableRow>
                                        <TableCell>
                                            {proposal.username}
                                        </TableCell>
                                        <TableCell>
                                            {proposal.material}
                                        </TableCell>
                                        <TableCell>
                                            {proposal.proposalQuantity}
                                        </TableCell>
                                        <TableCell>
                                            {proposal.reliabilityScore}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4}>
                                            No proposals available yet, come check in a bit! ;)
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        </TableBody>
                    </Table>
                )}
            </div>
        );
    }
}

export const ProposalsTable = connect(null, mapDispatcherToProps)(ProposalsTableComponent)