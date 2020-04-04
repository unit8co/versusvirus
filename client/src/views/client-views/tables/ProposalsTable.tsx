import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import * as React from "react";
import { IClientRequest, IProposal } from "../../../common/types";
import * as ActionsUser from "../../../common/actions";
import { UserActions } from "../../../common/types";

export interface IProposalsTableProps {
    proposals: IProposal[];
    selectProposal: (_: IProposal) => void;
}

const ProposalsTableComponent = (props: IProposalsTableProps) => {
    return (
        <div className="proposals-table">
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
                    {props.proposals.length > 0 ? (props.proposals
                        .map((proposal: IProposal) => {
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
                        }
                        )) : (
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

export default ProposalsTableComponent;