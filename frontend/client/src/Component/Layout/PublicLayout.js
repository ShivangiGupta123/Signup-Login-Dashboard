import React from 'react'
import {Outlet} from 'react-router-dom'
import Footer from '../Pages/Home/Footer'
// import Footer from '../Pages/Home/Footer'
import Header from '../Pages/Home/Header'
function PublicLayout(props) {
  return (
    <div>
    <Header/>
    
    <Outlet/>
    <Footer/>
   
    </div>
  )
}

export default PublicLayout