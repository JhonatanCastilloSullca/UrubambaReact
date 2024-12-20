
import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        const usuario = localStorage.getItem('usuario');
        
        if (token && id && usuario) {
            setUser({ token, id, usuario }); // Establece todos los valores en el estado user
        }
    }, []);
    
    const login = (data) => {
        const token = data.token;
        const usuario = data.user.usuario;
        const id = data.user.id;
        localStorage.setItem('token', token); 
        localStorage.setItem('usuario', usuario); 
        localStorage.setItem('id', id); 
        setUser({ token, usuario, id }); // Usar el token correctamente
        navigate('/'); 
    };
    

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('usuario');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    return useContext(AuthContext); 
}
