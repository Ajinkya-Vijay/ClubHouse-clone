
import './App.css'
import {BrowserRouter as Router ,Routes, Route} from 'react-router-dom'
import { MainPage } from './pages/main'
import { SigninPage } from './pages/sign-in'
import { RoomPage } from './pages/room'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/sign-in' element={<SigninPage/>}/>
        <Route path='/room' element={<RoomPage/>}/>
        {/* <Route path='/' element={<MainPage/>}/> */}
      </Routes>
    </Router>
  )
}

export default App
