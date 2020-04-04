import * as React from "react";
import { ClientRequestDetails } from "./tables/ClientRequestDetails";
import { ProposalsTable } from "./tables/ProposalsTable";
import { RequestsPreviewTable } from "./tables/RequestPreviewTable";
import { IClientRequest, IProposal } from "../common/types";

export interface IClientHomePageProps {
    clientRequests: IClientRequest[];
    providerProposals: IProposal[];
}

export interface IClientHomePageState {
    clientRequests: IClientRequest | undefined;
}
export class ClientHomePageComponent extends React.PureComponent<IClientHomePageProps> {

    public state = {
        selectedRequest: undefined,
    }

    public render() {
        return (
            <div>
                <div className="left-slider-tab">
                    <div className="client-requests">
                        {this.props.clientRequests.length > 0 ? (
                            <RequestsPreviewTable clientRequests={this.props.clientRequests}/>
                        ) : (
                            <p>No requests issued yet!</p>
                        )}
                    </div>
                </div>
                <div className="main-tab">
                    <ClientRequestDetails selectedRequest={this.state.selectedRequest}/>
                    <ProposalsTable proposals={this.props.providerProposals} />
                </div>
            </div>
            
        );
    }
}
