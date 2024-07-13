import { StreamVideoClient, Call } from "@stream-io/video-react-sdk"
import { createContext, ReactNode, useContext, useState } from "react";

    interface User{
        userName : string,
        name : string
    }

    interface UserContextProps {
        user : User | null,
        setUser : (user: User | null) => void,
        client : StreamVideoClient | undefined;
        setClient : (client: StreamVideoClient | undefined) => void;
        call : Call | undefined;
        setCall : (call : Call | undefined) => void
    }

    const UserContext = createContext<UserContextProps | undefined>(undefined);

    interface UserProviderProps{
        children : ReactNode
    }

    export const UserProvider = (props : UserProviderProps) =>{
        const [user, setUser] =useState<User | null>(null);
        const[call, setCall] = useState<Call>()
        const [client, setClient] =useState<StreamVideoClient>()

        return <UserContext.Provider value={{user, setUser,client, setClient, call, setCall}}>{props.children}</UserContext.Provider>
    }

    export const useUser =()=>{
        const context = useContext(UserContext);

        if(!context){
            throw new Error("useUser must be within provider")
        }

        return context;
    }