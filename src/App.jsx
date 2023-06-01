import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import About from './pages/About'
import Posts from './pages/Posts'
import Navbar from './components/UI/Navbar/Navbar'
import MainPage from './pages/MainPage'

function App() {
  return (
    
    <BrowserRouter>
    
    <Routes>
      <Route path='/' element={<MainPage/>}>
        <Route index element={<Posts/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
