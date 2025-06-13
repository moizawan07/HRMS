import './App.css'
import { BrowserRouter,  Routes } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
// Routes Import 
import UnAuthenRoutes from './routes/UnAuthenRoutes'
import AuthenRoutes from './routes/AuthenRoutes'


function App() {
  return (
    <>
    <ToastContainer /> 
      <BrowserRouter>
        <Routes>
        {UnAuthenRoutes()}
        {AuthenRoutes()}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App