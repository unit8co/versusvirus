import { get, post } from "./utils";

export const createProvider = (provider: any) => {
    return post("/api/providers", provider);    
}

export const createCustomer = (customer: any) => {
    return post("/api/customers", customer);    
}

export const getUserType = (userId: any) => {
    return get(`/api/users-type/${userId}`);
}