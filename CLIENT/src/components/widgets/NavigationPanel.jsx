import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function NavigationPanel({ handleLogout, user, count }) {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Navbar
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Главная
          </Nav.Link>
          {user.status !== "logged" ? (
            <>
              <Nav.Link as={Link} to="/signup">
                Регистрация
              </Nav.Link>
              <Nav.Link as={Link} to="/signin">
                Вход
              </Nav.Link>
            </>
          ) : (
            <>
              <Button onClick={handleLogout}>Выход</Button>
              <Nav.Link as={Link} to="/favorites">
                Избранное {count}
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
