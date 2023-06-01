import React from 'react'
import Navbar from '../components/UI/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const MainPage = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default MainPage
