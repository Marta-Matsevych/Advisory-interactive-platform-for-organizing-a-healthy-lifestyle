const API_BASE_URL = 'http://localhost:5000';

const api = {
    login: async (email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            return await response.json();
        } catch (error) {
            console.error('Error in api.login:', error);
            return { success: false, message: 'Error during login' };
        }
    },
};

export default api;
