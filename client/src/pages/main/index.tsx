import { StreamVideo } from "@stream-io/video-react-sdk"
import { useUser } from "../user-context"
import { Navigate } from "react-router-dom"

export const MainPage = () =>{

    const {client} = useUser()

    if(!client) return <Navigate to='/sign-in'/>
    return (
        <StreamVideo client={client}>
        <div>Main Page</div>
    </StreamVideo>
    )

}