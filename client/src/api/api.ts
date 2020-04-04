import { get, post } from "./utils";

const API_URL = "/api/v1";

export const createProvider = (provider: any) => {
    return post(`${API_URL}/providers`, provider);    
}

export const getCustomer = (id: string) => {
    return get(`${API_URL}/customers/{id}`);    
}

export const createCustomer = (customer: any) => {
    return post(`${API_URL}/customers`, customer);    
}

export const getUserType = (userId: any) => {
    return get(`${API_URL}/users-type/${userId}`);
}

export const getCustomerRequests = (userId: string) => {
    return get(`${API_URL}/customers/${userId}/requests`);
}