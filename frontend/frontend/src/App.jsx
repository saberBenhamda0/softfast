import './App.css'
import { useLocation } from 'react-router-dom'
import Chat from './pages/chat/page'
import Login from './pages/login/page'
import SignUp from './pages/sign-up/page'
import Main from './pages/main/page'
import Profile from './pages/profile/page'
import { Routes, Route } from 'react-router-dom'
import Shop from './pages/shop/page'
import ShopId from './pages/shopid/page'
import Components from './pages/components/page'
import Pricing from './pages/pricing/page'

function App() {
  let location = useLocation() 
  return (
    <div className='w-screen '>
      <Routes location={location} key={location.pathname}>
      <Route path='/login' element={<Login/>} />
      <Route path='/' element={<Main />}/>
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/contact-us' element={<Chat/>}key={location.pathname} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/pricing' element={<Pricing />} />
      <Route path='/components/overview' element={<Components />} />
      <Route path='/shop/:id' element={<ShopId />} />
    </Routes>
    </div>
  )
}

export default App
