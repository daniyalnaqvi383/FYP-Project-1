
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Add from './Pages/Add'
import Lists from './Pages/Lists'
import Order from './Pages/Order'
import Login from './Pages/Login'
import { useContext } from 'react'
import { AdminDataContext } from './Context/AdminContext'

function App() {
  let {adminData} = useContext(AdminDataContext);



  return (
    <>
    
   
   {!adminData ? <Login/> :
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/add' element={<Add/>}/>
      <Route path='/list' element={<Lists/>}/> 
      <Route path='/order' element={<Order/>}/> 
      <Route path='/login' element={<Login/>}/> 
    </Routes>}
     
    </>
  )
}

export default App
