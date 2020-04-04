import React, { useState } from "react";
import RegisterCard from "../components/RegisterCard";
import { useHistory } from "react-router";

const ClientHome = ({user} : { user : any}) => {
    const [isLoading, setIsLoading] = useState(false);
    return ( 
        <div className="client-home-container">
            ClientHome
        </div>
    )
}

export default ClientHome;