import React, { useState } from "react";
import { useUser } from "../user-context"
import { Navigate, useNavigate } from "react-router-dom"
import { StreamVideo, Call} from "@stream-io/video-react-sdk"
import CryptoJS from 'crypto-js'

interface NewRoom{
    name : string,
    description : string; 
}
interface Room{
    id : string;
    title : string;
    description : string;
    participantsLength : number;
    createdBy : string;
}

type customCallData = {
    title?: string;
    description?:string;
}

export const MainPage = () =>{

    const {client, user, setCall, isLoadingClient} = useUser();
    const [newRoom, setNewRoom] = useState<NewRoom>({name : '', description : ''});
    const [availablRooms, setAvailablRooms] = useState<Room[]>([]);

    const navigate = useNavigate()

    const hashRommName = (roomName : string):string =>{
        const hash = CryptoJS.SHA256(roomName).toString(CryptoJS.enc.Base64)
        return hash.replace(/[^a-zA-Z0-9_-]/g, "");
    }

    const createRoom = async() => {
        const {name, description} = newRoom;
        if(!client || !user || !name || !description) return;

        const call = client.call("audio_room",hashRommName(name))
        await call.join({
            create : true,
            data:{
                members: [{user_id : user.userName }],
                custom:{
                    title : name,
                    description,
                }
            }
        })
        setCall(call)
        navigate('/room')  
    };

    React.useEffect(() => {
        if (client) fetchAvailableCalls();
      }, [client]);

    const fetchAvailableCalls = async()=>{
        const callQueryResponse = await client?.queryCalls({
            filter_conditions:{ongoing : true},
            limit:4,
            watch:true
        });

        if(!callQueryResponse) {
            alert('Error getting calls')
        }else{
            const getCallInfo = async(call:Call): Promise<Room>=>{
                const callInfo = await call.get()
                const customData = callInfo.call.custom
                const {title, description} = (customData || {}) as customCallData;
                const participantsLength = callInfo.members.length ?? 0
                const createdBy = callInfo.call.created_by.name ?? ""
                const id =callInfo.call.id ?? ""
                return {
                    id,
                    createdBy,
                    participantsLength,
                    title : title ?? "",
                    description : description ?? ""
                }
            }
            const roomPromises = await callQueryResponse.calls.map((call)=>{
                return getCallInfo(call)
            })

            const rooms = await Promise.all(roomPromises);
            setAvailablRooms(rooms);
        }
    }
console.log(client)

    // if(client===) <Navigate to='/sign-in'/>
    
    const joinRoom = async (callID : string )=>{
        const call = client?.call("audio_room",callID)
        try{
            await call?.join()
            setCall(call)
            navigate('/room')
        }catch{
            alert("Error while joining call. Wait for room to be live.")
        }
    }

    setTimeout(()=>{
        {console.log('isLoadingClient',isLoadingClient)}
        if(isLoadingClient) return <h1>Loading...</h1>
        if((!isLoadingClient || !user)) return (
            <Navigate to='/sign-in'/>
    )
    },1000)

    return (
        <StreamVideo client={client!}>
        <div>
        <div className="home">Welcome, {user?.name}</div>
        <div className="form">
            <h2>Create Your Own Room</h2>
            <input placeholder="Room Name..." onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setNewRoom((prev)=>({...prev, name: event.target.value}))}}/>
            <input placeholder="Room Description..." onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setNewRoom((prev)=>({...prev, description: event.target.value}))}}/>
            <button onClick={createRoom} style={{backgroundColor:"rgb(125,7,236"}}>Create Room</button>
        </div>
        {availablRooms?.length !== 0 ? (
            <>
                <h2>Available Rooms</h2>
               <div className="grid">
               {availablRooms.map((room) => (
                 <div
                   className="card"
                   key={room.id}
                   onClick={() => joinRoom(room.id)}
                 >
                   <h4>{room?.title}</h4>
                   <p>{room?.description}</p>
                   <p> {room?.participantsLength} Participants</p>
                   <p> Created By: {room?.createdBy}</p>
                   <div className="shine"></div>
                 </div>
               ))}
             </div>
             </>
        ) : (<h2>No Available Rooms at the moment</h2>)}
        </div>
    </StreamVideo>
    )

}