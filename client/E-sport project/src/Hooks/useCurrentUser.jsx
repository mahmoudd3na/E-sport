import { useState, useEffect } from 'react';

const useCurrentUser = () => {
    // State to store the current user
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Function to fetch the current user based on the token
        const fetchCurrentUser = async () => {
            try {
                // Get the token from local storage
                const token = localStorage.getItem('accessToken');

                if (token) {
                    // Make a request to your server or API to fetch the user based on the token
                    const response = await fetch('http://localhost:3001/users/current', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        // You may need to adjust other options based on your API requirements
                    });

                    if (response.ok) {
                        // If the response is successful, set the current user state
                        const user = await response.json();
                        setCurrentUser(user);
                    } else {
                        // Handle the case where the response is not successful
                        console.error('Error fetching current user:', response.statusText);
                    }
                }
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        // Call the fetchCurrentUser function when the component mounts
        fetchCurrentUser();
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    return currentUser;
};

export default useCurrentUser;
