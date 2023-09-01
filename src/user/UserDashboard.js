import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userProfileAction, updateUserProfileAction } from '../redux/actions/userAction';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function UserDashboard() {
    const { user, loading } = useSelector(state => state.userProfile);
    const dispatch = useDispatch();
    const brazilianStates = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
        'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        cep: '',
        cidade: '',
        estado: '',
        rua: '',
        numero: '',
        complemento: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserProfileAction(formData));
    };

    useEffect(() => {
        if (user) {
            setFormData({
                nome: user.nome,
                email: user.email,
                telefone: user.telefone,
                cep: user.cep,
                cidade: user.cidade,
                estado: user.estado,
                rua: user.rua,
                numero: user.numero,
                complemento: user.complemento,
            });
        }
    }, [user]);

    useEffect(() => {
        dispatch(userProfileAction());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            {user !== null ? (
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="nome">
                            <Form.Label>Nome:</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="email">
                            <Form.Label>E-mail:</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group >
                        <Form.Group as={Col} controlId="telefone">
                            <Form.Label>Telefone:</Form.Label>
                            <Form.Control
                                type="text"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleInputChange}
                            />
                        </Form.Group >
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="form-group">
                            <Form.Label>Cep:</Form.Label>
                            <Form.Control
                                type="text"
                                name="cep"
                                value={formData.cep}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="form-group">
                            <Form.Label>Cidade:</Form.Label>
                            <Form.Control
                                type="text"
                                name="cidade"
                                value={formData.cidade}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="form-group">
                            <Form.Label>Estado:</Form.Label>
                            <Form.Select
                                name="estado"
                                value={formData.estado}
                                onChange={handleInputChange}
                            >
                                <option disabled></option>
                                {brazilianStates.map((state, index) => (
                                    <option key={index} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={10}>
                            <Form.Group as={Col} controlId="form-group">
                                <Form.Label>Rua:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="rua"
                                    value={formData.rua}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                        <Form.Group as={Col} controlId="form-group">
                            <Form.Label>Numero:</Form.Label>
                            <Form.Control
                                type="number"
                                name="numero"
                                value={formData.numero}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Row>

                    <Form.Group as={Col} controlId="form-group">
                        <Form.Label>Complemento:</Form.Label>
                        <Form.Control
                            type="text"
                            name="complemento"
                            value={formData.complemento}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button className="mt-3" variant="primary" type="submit">
                        Atualizar Perfil
                    </Button>
                </Form>
            ) : (
                <div>Nenhum usuário cadastrado</div>
            )
            }
        </Container >
    );
}

export default UserDashboard;
