import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import './navbar.css';

function NavbarComponent() {
    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={NavLink} to="/">Walking-Dog</Navbar.Brand>
                <Nav className="d-flex justify-content-center">
                    <Nav.Link as={NavLink} to="/appointment">Marque um horário</Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                    <NavDropdown title="Perfil" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">editar</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Meus Horarios</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
