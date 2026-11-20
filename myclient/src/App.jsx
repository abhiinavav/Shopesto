
import React from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Homelayout from '../layouts/Homelayout'
import Home from './pages/Home'
import Product from './pages/Product'
import Userprof from './pages/Userprof'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import { Toaster } from 'react-hot-toast'
import Admin from './pages/admin/Admin'
import AdminProduct from './pages/admin/Adminproduct'


const App = () => {
  return (
    <>
        <Toaster/>
        <Routes>
                <Route path='/' element={<Homelayout/>}>
                <Route index element={<Home/>}/>
                <Route path='/product' element={<Product/>}/>
                <Route path='/user' element={<Userprof/>}/>
                <Route path='/cart' element={<Cart/>}/>
                </Route>

            <Route path='/login' element={<Login/>}/>
            <Route path ='/register' element={<Register/>}/>
            <Route path='/admin' element={<Admin/>}/>
            <Route path ='/admin/products' element={<AdminProduct/>}/>

            
        </Routes>

    </>
  )
}

export default App