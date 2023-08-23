import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';

function NavbarComponent() {
    const isAuthenticated = useSelector(state => state.signIn.isAuthenticated);

    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={NavLink} to="/">
                    <div>Walking-Dog</div>
                </Navbar.Brand>
                <Nav className="d-flex justify-content-center">
                    <Nav.Link as={NavLink} to="/appointment">
                        <div className="nav-text">Agende um horário</div>
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/prices">
                        <div className="nav-text">Conheça nossos planos</div>
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/register">
                        <div className="nav-text">Quem sou eu</div>
                    </Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                    {isAuthenticated ? (
                        <NavDropdown title="Perfil" id="basic-nav-dropdown">
                            <NavDropdown.Item as={NavLink} to="/user/dashboard">
                                <i class="bi bi-pencil-square"> Editar</i>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/admin/appointment/create">
                                <i class="bi bi-clock-history"> Meus Horarios</i>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">
                                <i class="bi bi-door-open-fill"> Sair</i>
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <Nav.Link as={NavLink} to="/login">
                            <div className="nav-text">
                                <i class="bi bi-door-closed-fill"> Entrar</i>
                            </div>
                        </Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
