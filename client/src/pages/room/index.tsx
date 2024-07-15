import { OwnCapability, useCallStateHooks, useRequestPermission } from "@stream-io/video-react-sdk"
import { Controls } from "./controls";
import { useUser } from "../user-context";
import PermissionRequestPanel from "./permission-request";
import Participants from "./participants";

export const RoomPage = () =>{
    const {useCallCustomData, useParticipants, useCallCreatedBy} = useCallStateHooks()
    const {user} = useUser()
    const custom = useCallCustomData();
    const participants = useParticipants();
    const createdBy = useCallCreatedBy();
    const {hasPermission, requestPermission} = useRequestPermission(OwnCapability.SEND_AUDIO);

    return(
    <div className="room">
        <h2 className="title">{custom?.title ?? "TITLE"}</h2>
        <h3 className="description">{custom?.description ?? "description"}</h3>
        <p className="participant-count">{participants?.length} participants</p>
        <Participants/>
        {user?.userName === createdBy?.id && <PermissionRequestPanel/>}
        {hasPermission ? <Controls/> : <button onClick={requestPermission}>&#9995;</button>}
    </div>
    )
}