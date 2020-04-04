import { action } from "typesafe-actions";
import * as Constants from "./constants";
import { IClientRequest } from "./types";

export function changeSelectedRequest(newRequest: IClientRequest) {
    return action(Constants.MODIFY_CLIENT_SELECTED_REQUEST, { newRequest });
}