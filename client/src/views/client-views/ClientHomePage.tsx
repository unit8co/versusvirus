import * as React from "react";
import { ClientRequestCreation } from "./ClientRequestCreation";
import { ProposalDetails } from "./ProposalDetails";
import { ClientRequestDetails } from "./tables/ClientRequestDetails";
import { ProposalsTable } from "./tables/ProposalsTable";
import { RequestsPreviewTable } from "./tables/RequestPreviewTable";
import { IClientRequest, IProposal } from "../../common/types";
import { Button } from "@material-ui/core";

export interface IClientHomePageProps {
    clientRequests: IClientRequest[];
    providerProposals: IProposal[];
}

export interface IClientHomePageState {
    displayRequestCreation: boolean;
    displayProposalDetails: boolean;
    selectedProposal: IProposal | undefined;
    selectedRequest: IClientRequest | undefined;
}
export class ClientHomePageComponent extends React.PureComponent<IClientHomePageProps> {

    public state = {
        displayRequestCreation: false,
        displayProposalDetails: false,
        selectedProposal: undefined,
        selectedRequest: undefined,
    }

    public render() {
        return (
            <div>
                <div className="left-slider-tab">
                    <div className="client-requests">
                        {this.props.clientRequests.length > 0 ? (
                            <RequestsPreviewTable
                                clientRequests={this.props.clientRequests}
                                changeCurrentRequest={this.updateCurrentRequest}
                            />
                        ) : (
                            <p>No requests issued yet!</p>
                        )}
                    </div>
                    <div className="new-request-button">
                        <Button
                            variant="contained" 
                            color="primary"
                            onClick={this.displayRequestCreation()}
                        >
                            NEW REQUEST
                        </Button>
                    </div>
                </div>
                <div className="main-tab">
                    <ClientRequestDetails selectedRequest={this.state.selectedRequest}/>
                    <ProposalsTable proposals={this.props.providerProposals} selectProposal={this.updateCurrentProposal} />
                </div>
                <div className="pop-up-container">
                    {this.state.displayRequestCreation && (
                        <ClientRequestCreation closePopUp={this.closeRequestCreation}/>
                    )}
                    {this.state.displayProposalDetails && (
                        <ProposalDetails currentProposal={this.state.selectedProposal} closePopUp={this.closeProposalDetails}/>
                    )}
                </div>
            </div>
            
        );
    }

    private updateCurrentRequest(newCurrentRequest: IClientRequest) {
        this.setState({ selecteRequest: newCurrentRequest});
    };

    private updateCurrentProposal(newProposal: IProposal) {
        this.setState({ displayProposalDetails: true, selectedProposal: newProposal});
    };

    private displayRequestCreation = () => () => {
        this.setState({ displayRequestCreation: true })
    };

    private closeRequestCreation = () => () =>  {
        this.setState({ displayRequestCreation: false })
    };

    private closeProposalDetails = () => () =>  {
        this.setState({ displayProposalDetails: false, selectedProposal: undefined })
    };
}
