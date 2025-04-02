import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function NavigationPanel({ handleLogout, user }) {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Главная</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          {user.status !== "logged" ? (
            <>
              <Nav.Link href="/signup">Регистрация</Nav.Link>
              <Nav.Link href="/signin">Вход</Nav.Link>
            </>
          ) : (
            <>
              {" "}
              <Button onClick={handleLogout}> Выход</Button>
              <Nav.Link href="/favorites">Избранное</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
