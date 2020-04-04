import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { MATERIALS } from "./materials";

export interface IClientRequest {
    requestId: string;
    requestedProduct: string;
    requestedAmount: number;
    currentlyProvided: number;
}

export interface IProposal {
    requestId: string;
    username: string;
    material: MATERIALS;
    proposalQuantity: number;
    reliabilityScore: number;
}

export type UserActions = ActionType<typeof actions>;