import * as qs from "query-string";
import * as firebase from "firebase/app";

function execute<T>(request: (token: string) => Promise<Response>) {
    return firebase
        .auth()
        .currentUser!
        .getIdToken(true)
        .then(request)
        .then(async result => {
            return result.json();
        });
}

export function get<T>(
    url: string,
    queryPath?: { [key: string]: string | number }
): Promise<T> {
    const request = (token: string) =>
        fetch(`${url}?${qs.stringify(queryPath || {})}`, {
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                token
            }
        });
    return execute(request);
}

export function post<T, K>(url: string, body: K): Promise<T> {
    const request = (token: string) =>
        fetch(`${url}`, {
            credentials: "same-origin",
            mode: "cors",
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                token
            }
        });

    return execute(request);
}