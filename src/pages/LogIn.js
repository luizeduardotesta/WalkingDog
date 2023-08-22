import React, { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSignInAction } from '../redux/actions/userAction';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    email: yup
        .string('Coloque o seu senha email')
        .email('Coloque um email valido')
        .required('O email é necessaria'),
    password: yup
        .string('Coloque a sua senha password')
        .min(8, 'A senha deve ter no minomo 8 characters')
        .required('A senha é necessaria'),
});

const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, userInfo } = useSelector(state => state.signIn);

    useEffect(() => {
        if (isAuthenticated) {
            if (userInfo.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        }
    }, [isAuthenticated]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(userSignInAction(values));
            actions.resetForm();
        }
    });

    return (
        <div className="color-overlay d-flex justify-content-center align-items-center">
            <Form onSubmit={formik.handleSubmit} className="rounded p-4 p-sm-3">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Digite seu e-mail"
                        {...formik.getFieldProps('email')}
                    />
                    <Form.Text className="text-danger">
                        {formik.touched.email && formik.errors.email}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Digite sua senha"
                        {...formik.getFieldProps('password')}
                    />
                    <Form.Text className="text-danger">
                        {formik.touched.password && formik.errors.password}
                    </Form.Text>
                </Form.Group>

                <Button className="mb-3" variant="primary" type="submit">
                    Entrar
                </Button>
                <p>
                    Se você ainda não é cadastrado, <a href="/register">clique aqui</a>
                </p>
            </Form>
        </div>
    )
}

export default LogIn;
