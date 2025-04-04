import React from "react";
import Container from "react-bootstrap/esm/Container";

import { Outlet } from "react-router";
import NavigationPanel from "./NavigationPanel";

export default function Layout({ handleLogout, user, count }) {
  return (
    <Container>
      <NavigationPanel user={user} handleLogout={handleLogout} count={count} />
      <Outlet />
    </Container>
  );
}
