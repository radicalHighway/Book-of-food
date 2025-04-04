import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Footer from "./Footer/Footer"
import { Outlet } from 'react-router'
import NavigationPanel from './NavigationPanel'

export default function Layout({ handleLogout, user, count }) {
  return (
    <div className="wrapper"> 
     <NavigationPanel user={user} handleLogout={handleLogout} count={count} />
    <Container className="content"> 
      <Outlet />
    </Container>
    <Footer /> 
  </div>

  );
      
         
   
}
