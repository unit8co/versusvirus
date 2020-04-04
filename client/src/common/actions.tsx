import { action } from "typesafe-actions";
import * as Constants from "./constants";
import { IClientRequest, IProposal } from "./types";

export function changeSelectedRequest(newRequest: IClientRequest) {
    return action(Constants.MODIFY_CLIENT_SELECTED_REQUEST, { newRequest });
}

export function closeRequestCreation() {
    return action(Constants.CLOSE_CLIENT_REQUEST_CREATION_POPUP, { });
}

export function closeProposalDetails() {
    return action(Constants.CLOSE_CLIENT_PROPOSAL_DETAILS_POPUP, { })
}

export function changeSelectedProposal(newProposal: IProposal) {
    return action(Constants.MODIFY_CLIENT_SELECTED_PROPOSAL, { newProposal })
}