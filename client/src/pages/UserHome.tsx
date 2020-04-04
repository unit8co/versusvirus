import React, {useState} from "react";
import { getUserType, getCustomer } from "../api/api";
import ClientHome from "./ClientHome";
import ProviderHome from "./ProviderHome";

const UserHome = ({user} : {user: any}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userType, setUserType] = useState(undefined as unknown);
    const [isApproved, setIsApproved] = useState(false);
    getUserType(user.uid).then(e => {
        if (e === "provider") {
            setUserType(e);
            setIsLoading(false);
        } else if (e === "consumer") {
            setUserType(e);
            getCustomer(user.uid).then((e: any) => {
                setIsApproved(e.approved);
                setIsLoading(false);
            })
        }
    });

    if (isLoading) return (<div>loading</div>);
    if (userType === "provider") return (<ProviderHome user={user}/>);
    if (userType === "customer" && isApproved) return (<ClientHome user={user}/>);
    if (userType === "customer" && !isApproved) return (<div>approval pending</div>);
    else {
        return (<div>error</div>)
    }

}

export default UserHome;