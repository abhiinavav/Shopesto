
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
import ProtectedRoute from './components/ProtectedRoutes'
import PublicOnlyRoute from './components/PublicOnlyRoute'


const App = () => {
  return (
    <>
        <Toaster/>
        <Routes>
                <Route path='/' element={<Homelayout/>}>
                <Route index element={<Home/>}/>
                
                <Route path='/product' element={<Product/>}/>

                <Route path='/user' element={
                <ProtectedRoute>
                    <Userprof/>
                </ProtectedRoute>
                  }/>

                <Route path='/cart' 
            
                    element={
                
                <ProtectedRoute>
                  <Cart/>
                </ProtectedRoute>
                
                }/>
                </Route>

                    <Route path='/admin'
                       element={
                      <ProtectedRoute allowedRoles={["admin"]}  >
                        <Admin/>
                      </ProtectedRoute>
                       
                       
                       }>
                <Route path ='/admin/products' element={<AdminProduct/>}/>



                       </Route>




            <Route path='/login' 
              element={
                <PublicOnlyRoute>
                  <Login/>
                </PublicOnlyRoute>
              }/>

            <Route path ='/register'
               element={
               <PublicOnlyRoute>
                  <Register/>
               </PublicOnlyRoute>
               }/>
            
                {/* 404 Route */}
        <Route
          path="*"
          element={
            <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
              <h1 className="text-6xl font-bold text-gray-800">404</h1>
              <p className="mt-3 text-lg text-gray-600">The page you are looking for does not exist.</p>
              <a href="/" className="mt-6 rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800">
                Go to Homepage
              </a>
            </div>
          }/>
            
        </Routes>

    </>
  )
}

export default App