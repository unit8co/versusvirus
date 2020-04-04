import React, { useState } from "react";
import ClientRequestCreation from "./ClientRequestCreation";
import ProposalDetails from "./ProposalDetails";
import ClientRequestDetails from "./tables/ClientRequestDetails";
import ProposalsTable from "./tables/ProposalsTable";
import RequestsPreviewTable from "./tables/RequestPreviewTable";
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

const ClientHomePageComponent = (props: IClientHomePageProps) => {

    const [displayRequestCreation, setDisplayRequestCreation] = useState(false);
    const [displayProposalDetails, setDisplayProposalDetails] = useState(false);
    const [selectedProposal, setSelectedProposal] = useState(undefined as unknown as IProposal);
    const [selectedRequest, setSelectedRequest] = useState(undefined as unknown as IClientRequest);

    return (
        <div>
            <div className="left-slider-tab">
                <div className="client-requests">
                    {props.clientRequests.length > 0 ? (
                        <RequestsPreviewTable
                            clientRequests={props.clientRequests}
                            changeCurrentRequest={setSelectedRequest}
                        />
                    ) : (
                            <p>No requests issued yet!</p>
                        )}
                </div>
                <div className="new-request-button">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setDisplayRequestCreation(true)}
                    >
                        NEW REQUEST
                        </Button>
                </div>
            </div>
            <div className="main-tab">
                <ClientRequestDetails selectedRequest={selectedRequest} />
                <ProposalsTable proposals={props.providerProposals} selectProposal={setSelectedProposal} />
            </div>
            <div className="pop-up-container">
                {displayRequestCreation && (
                    <ClientRequestCreation closePopUp={() => setDisplayRequestCreation(false)} />
                )}
                {displayProposalDetails && (
                    <ProposalDetails currentProposal={selectedProposal} closePopUp={() => setDisplayProposalDetails(false)} />
                )}
            </div>
        </div>

    );
};

export default ClientHomePageComponent;
