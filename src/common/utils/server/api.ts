import { SERVER_URL } from "./api.const";
import { SignInBody } from "./api.types";

export const signInReq = (body: SignInBody) => {
    return fetch(`${SERVER_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        return data
    })
};
