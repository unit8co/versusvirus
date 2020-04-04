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