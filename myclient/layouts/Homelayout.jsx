import React from 'react'
import Header from '../src/components/Header'
import { Outlet } from 'react-router-dom'

const Homelayout = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Homelayout