import React from 'react'
import Container from 'react-bootstrap/esm/Container'

import { Outlet } from 'react-router'
import NavigationPanel from './NavigationPanel'

export default function Layout() {
  return (
    <Container>
      
          <NavigationPanel />
          <Outlet />
       
      </Container>
  )
}
