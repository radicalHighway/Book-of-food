
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
            <Nav.Link as={Link} to="/recipes">Рецепты</Nav.Link>
            <Nav.Link as={Link} to="/about">О нас</Nav.Link>
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
              <Button variant="outline-danger" onClick={handleLogout}>
                Выход
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}















// import React, { useEffect, useRef, useState } from 'react'
// import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/esm/Button';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { Link } from 'react-router-dom';




// export default function NavigationPanel({ handleLogout, user }) {
//   const [showDropdown, setShowDropdown] = useState(false); // состояние для  управления видимостью выпадающего меню
// // Ссылка на DOM-элемент для обработки кликов вне меню
// const dropdownRef = useRef(null);

// // Эффект для обработки кликов вне области меню
// useEffect(() => {
//   const handleClickOutside = (event) => {
//     // Если клик был вне элемента dropdownRef, закрываем меню
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setShowDropdown(false);
//     }
//   };
// // Добавляем обработчик при монтировании компонента
// document.addEventListener('mousedown', handleClickOutside);
//  // Удаляем обработчик при размонтировании (очистка эффекта)
//  return () => document.removeEventListener('mousedown', handleClickOutside);
// }, []); // Пустой массив зависимостей - эффект выполняется только при монтировании



// return (
//   <Navbar bg="dark" data-bs-theme="dark">
//     <Container>
//       <Navbar.Brand as={Link} to="/">Navbar</Navbar.Brand>
//       <Nav className="me-auto">
//         <Nav.Link as={Link} to="/">Главная</Nav.Link>
//         <Nav.Link href="#features">Features</Nav.Link>
//         <Nav.Link href="#pricing">Pricing</Nav.Link>
//       </Nav>
//       <Nav>
//         {user.status !== "logged" ? (
//           <div ref={dropdownRef} className="position-relative">
//             <Button 
//               variant="outline-light" 
//               onClick={() => setShowDropdown(!showDropdown)}
//             >
//               Вход
//             </Button>
//             {showDropdown && (
//               <div className="dropdown-menu show position-absolute end-0 mt-2">
//                 <Link 
//                   to="/signin" 
//                   className="dropdown-item d-block px-3 py-2 text-decoration-none text-dark"
//                   onClick={() => setShowDropdown(false)}
//                 >
//                   Войти
//                 </Link>
//                 <Link 
//                   to="/signup" 
//                   className="dropdown-item d-block px-3 py-2 text-decoration-none text-dark"
//                   onClick={() => setShowDropdown(false)}
//                 >
//                   Регистрация
//                 </Link>
//               </div>
//             )}
//           </div>
//         ) : (
//           <Button onClick={handleLogout}>Выход</Button>
//         )}
//       </Nav>
//     </Container>
//   </Navbar>
// );
// }




















// return (
//   <Navbar bg="dark" data-bs-theme="dark">
//   <Container>
//     <Navbar.Brand href="#home">Navbar</Navbar.Brand>
//     <Nav className="me-auto">
//       <Nav.Link to={"/"}>Главная</Nav.Link>
//       <Nav.Link href="#features">Features</Nav.Link>
//       <Nav.Link href="#pricing">Pricing</Nav.Link>
//       {user.status !== "logged" ? (
//           <>
//             <Nav.Link href="/signup">Регистрация</Nav.Link>
//             <Nav.Link href="/signin">Вход</Nav.Link>
//           </>
//         ) : (
//           <Button onClick={handleLogout}> Выход</Button>
//         )}
//     </Nav>
//   </Container>
// </Navbar>
// )
// }