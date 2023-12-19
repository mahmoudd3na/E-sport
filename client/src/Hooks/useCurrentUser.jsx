import { useState, useEffect } from 'react';

const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const token = localStorage.getItem('accessToken');

                if (token) {
                    const response = await fetch('http://localhost:3001/users/current', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const user = await response.json();
                        setCurrentUser(user);
                    } else {
                        console.error('Error fetching current user:', response.statusText);
                    }
                }
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        fetchCurrentUser();
    }, []);

    return currentUser;
};

export default useCurrentUser;
