const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
    login: async (email, password) => {
        await delay(1000);

        //test validacio adatbazis nelkul
        if (email === 'test@test.com' && password === 'password') {
            const user = {
                id: 1,
                email: email,
                name: 'test user',
                token: 'mock-jwt-token-' + Date.now()
            };
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }

        throw new Error('Hibás email vagy jelszó');
    },

    register: async (userData) => {
        await delay(1000)

        //test validacio adatbazis nelkul
        if (userData.email && userData.password && userData.name) {
            const user = {
                id: Date.now(),
                email: userData.email,
                name: userData.name,
                token: 'mock-jwt-token-' + Date.now()
            };
            localStorage.setItem('user', JSON.stringify(user));
            return { success: true, data: user};
        }

        throw new Error('Hibás adatok.');
    },

    logout: () => {
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}