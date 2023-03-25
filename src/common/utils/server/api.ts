import { SERVER_URL } from "./api.const";
import { SignInBody } from "./api.types";

// export const signInReq = async (body: SignInBody) => {
//     const res = await fetch(`${SERVER_URL}/auth/login`, {
//         method: "POST",
//         body: JSON.stringify(body),
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });

//     const token = res.headers.get("Authorization");
//     const user = await res.json();

//     return {
//         user,
//         token,
//     };
// };
