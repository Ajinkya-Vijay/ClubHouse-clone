
import './App.css'
import {BrowserRouter as Router ,Routes, Route, Navigate} from 'react-router-dom'
import { MainPage } from './pages/main'
import { SigninPage } from './pages/sign-in'
import { RoomPage } from './pages/room'
import { StreamCall } from '@stream-io/video-react-sdk'
import { useUser } from './pages/user-context';

function App() {
  const {call} = useUser();

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/sign-in' element={<SigninPage/>}/>
        <Route path='/room' element={
          call ? 
          <StreamCall call={call}>
            <RoomPage/>
          </StreamCall> : <Navigate to="/"/>
          }/>
    
        {/* <Route path='/' element={<MainPage/>}/> */}
      </Routes>
    </Router>
  )
}

export default App
