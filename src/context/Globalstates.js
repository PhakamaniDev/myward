import { createContext } from "react";

//credentials context
export const CredentialContext = createContext({
    ward_code: [{}],
    setWardCode: () => {},
})