import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogoutAction } from '../redux/actions/userAction';
import './Navbar.css';

function NavbarComponent() {
    const isAuthenticated = useSelector(state => state.signIn.isAuthenticated);
    const userInfo = useSelector(state => state.signIn.userInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = () => {
        dispatch(userLogoutAction());
        window.location.reload(true);
        setTimeout(() => {
            navigate('/');
        }, 500)
    }

    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={NavLink} to="/">
                    <div className="d-flex align-items-center">
                        <img
                            src={require('../images/icone_dog_2.jpeg')}
                            alt="Dog Icon"
                            style={{ opacity: 0.8 }}
                        />
                        Walking-Dog
                    </div>
                </Navbar.Brand>
                <Nav className="d-flex justify-content-center">
                    <Nav.Link as={NavLink} to="/prices">
                        <div className="nav-text">Nossos pacotes</div>
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/aboutme">
                        <div className="nav-text">Quem sou eu</div>
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/mvv">
                        <div className="nav-text">Missão, valor e valores</div>
                    </Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                    {isAuthenticated && userInfo.tipo === 'admin' ? (
                        <NavDropdown title="Perfil" id="basic-nav-dropdown">
                            <NavDropdown.Item as={NavLink} to="/admin/dashboard">
                                <i className="bi bi-pencil-square"> Editar</i>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/admin/appointment">
                                <i className="bi bi-clock"> Ver e Editar Horarios</i>
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => logOut()}>
                                <i className="bi bi-door-open-fill"> Sair</i>
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : isAuthenticated ? (
                        <NavDropdown title="Perfil" id="basic-nav-dropdown">
                            <NavDropdown.Item as={NavLink} to="/user/dashboard">
                                <i className="bi bi-pencil-square"> Editar</i>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/user/appointment">
                                <i className="bi bi-clock"> Marcar Horarios</i>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/user/appointment">
                                <i className="bi bi-clock"> Meus Horarios</i>
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => logOut()}>
                                <i className="bi bi-door-open-fill"> Sair</i>
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <Nav.Link as={NavLink} to="/login">
                            <div className="nav-text">
                                <i className="bi bi-door-closed-fill"> Entrar</i>
                            </div>
                        </Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
