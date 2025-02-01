import React, {
    ReactNode, createContext, useContext, useEffect, useState
} from 'react';
import { useRouter } from 'next/router';

interface AuthContextType {
    authenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

interface Props {
    children: ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        setAuthenticated(!!token);
    }, []);

    const login = (token: string) => {
        sessionStorage.setItem("authToken", token);
        setAuthenticated(true);
        router.push('/');
    };

    const logout = () => {
        sessionStorage.removeItem("authToken");
        setAuthenticated(false);
        router.push('login');
    };

    return (
        <AuthContext.Provider value={{ authenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
