import React from 'react';
import { Navbar, Container, Nav, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavigationPanel({ handleLogout, user }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Book-of-Food</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Главная</Nav.Link>
            {/* <Nav.Link as={Link} to="/recipes">Рецепты</Nav.Link> */}
           
          </Nav>
          
          <Nav>
            {user.status !== "logged" ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-light" id="dropdown-auth">
                  Вход
                </Dropdown.Toggle>
                
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/signin">
                    Войти
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/signup">
                    Регистрация
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
              <Button variant="outline-danger" onClick={handleLogout}>
                Выход
              </Button>
              <Nav.Link href="/favorites">Избранное</Nav.Link>
              </>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}