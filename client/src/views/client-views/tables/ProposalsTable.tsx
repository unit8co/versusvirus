import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { IClientRequest, IProposal } from "../../../common/types";
import * as React from "react";

export interface IProposalsTableProps {
    proposals: IProposal[];
}
export interface IProposalsTableState {
    currentClientRequest: IClientRequest;
}

export class ProposalsTable extends React.PureComponent<IProposalsTableProps, IProposalsTableState > {
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
