import React, { useState, useEffect } from 'react';

const DropdownWithDetails = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        // Fetch initial dropdown options from API
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleChange = async (event) => {
        const selectedId = event.target.value;
        setSelectedUserId(selectedId);

        // Fetch details based on selected user
        if (selectedId) {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${selectedId}`);
                const data = await response.json();
                setUserDetails(data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        } else {
            setUserDetails(null); // Clear details if no user is selected
        }
    };

    return (
        <div>
            <select onChange={handleChange} value={selectedUserId}>
                <option value="">Select a user</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>

            {userDetails && (
                <div>
                    <h2>User Details</h2>
                    <p><strong>Name:</strong> {userDetails.name}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <p><strong>Phone:</strong> {userDetails.phone}</p>
                    <p><strong>Website:</strong> {userDetails.website}</p>
                    <p><strong>Company:</strong> {userDetails.company.name}</p>
                </div>
            )}
        </div>
    );
};

export default DropdownWithDetails;