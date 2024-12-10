import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Crear contexto con un valor predeterminado
const AuthContext = createContext({
    user: null,
    login: () => { },
    logout: () => { },
});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = ({ username, password }) => {
        setUser({ username });
        navigate('/');
    };

    const logout = () => {
        setUser(null);
        navigate('/login')
    };

    const auth = { user, login, logout };

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const auth = useContext(AuthContext);
    return auth;
}

export {
    AuthProvider,
    useAuth,
};
