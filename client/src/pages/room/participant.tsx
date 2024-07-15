import { Avatar, StreamVideoParticipant } from '@stream-io/video-react-sdk'

interface Props{
    participant : StreamVideoParticipant;
}

export default function Participant(props : Props) {
  return (
    <div className='participant'>
        <Avatar imageSrc={props.participant.image} style={{width:"60px",height:"60px",borderRadius:"50",
            boxShadow: props.participant.isSpeaking ? "0 0 1px 2px green" : "none"
        }}/>
        <div style={{  boxShadow: props.participant.isSpeaking ? "0 0 1px 2px green" : "none"}}>{props.participant.name}</div>
    </div>
  )
}
