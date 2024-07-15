import { useCall, PermissionRequestEvent } from '@stream-io/video-react-sdk'
import React, { useCallback, useState } from 'react'

export default function PermissionRequestPanel() {
    const [permissionRequests , setPermissionRequests] = useState<PermissionRequestEvent[]>([])

    const call = useCall()

    React.useEffect(()=>{
        return call?.on("call.permission_request", (event)=>{
            const request = event as PermissionRequestEvent;
            setPermissionRequests((reqs)=> [...reqs,request])
        })
    },[call])

    const handlePermissionRequest = useCallback(async (request : PermissionRequestEvent, accept : boolean)=>{
            const {user, permissions} = request;
            try{
                if(accept){
                    await call?.grantPermissions(user.id, permissions)
                }else{
                    await call?.revokePermissions(user.id, permissions);
                    setPermissionRequests((reqs)=> reqs.filter((req)=> req !== request))
                }
            }catch{
                alert('Alert while Approving/denying request.')
            }
        }
    ,[call])
  return (
    <div className='permission-requests'>
        <h4>Permission Request</h4>
        {permissionRequests?.map((request)=>(
            <div className='permission-request' key={request.user.id}>
                <span>{request.user.name} requested to {request.permissions.join(", ")}</span>
                <button onClick={()=>handlePermissionRequest(request,true)}>Approve</button>
                <button onClick={()=>handlePermissionRequest(request,true)}>Deny</button>
            </div>
        ))
        }
    </div>
  )
}
