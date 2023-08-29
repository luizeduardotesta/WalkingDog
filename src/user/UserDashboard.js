import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userProfileAction } from '../redux/actions/userAction';

function UserDashboard() {
    const { user, loading } = useSelector(state => state.userProfile);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userProfileAction());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {user ? (
                <>
                    <h1>User Profile</h1>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Senha: {user.senha}</p>
                    <p>telefone: {user.telefone}</p>
                    <p>cep: {user.cep}</p>
                    <p>cidade: {user.cidade}</p>
                    <p>estado: {user.estado}</p>
                    <p>rua: {user.rua}</p>
                    <p>numero: {user.numero}</p>
                    <p>complemento: {user.complemento}</p>
                </>
            ) : (
                <div>No user data available</div>
            )}
        </div>
    );
}

export default UserDashboard