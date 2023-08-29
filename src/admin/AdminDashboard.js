import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userProfileAction } from '../redux/actions/userAction';

function AdminDashboard() {
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
                    {/* Render other user data fields */}
                </>
            ) : (
                <div>No user data available</div>
            )}
        </div>
    );
}

export default AdminDashboard;