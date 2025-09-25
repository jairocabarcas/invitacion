"use client";

import {createContext, useContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";

type User = {
    id: string;
    name: string;
    email: string;
    surname: string;
};

type JwtPayload = {
    userId: string;
    surname: string; // id del usuario
    name: string;
    email: string;
    role?: string;
    expiresAt: number; // fecha de expiración
};

type sessionContext = {
    user: User;
}

const SessionContext = createContext<sessionContext|undefined>(undefined);

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    // Al montar, revisa si hay token guardado
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Aquí puedes validar el token contra tu backend o decodificarlo
            // Por ahora, simulamos un usuario
            const tokenInfo = decodeJWT(token);
           if (tokenInfo){
               setUser(tokenInfo);
           }
        }
    }, []);

    const handleLogin = async (email: string, password: string) => {
        try {
            console.log(process.env.APP_FAMILY_SERVICE_URL)
            const res = await fetch(`${process.env.NEXT_PUBLIC_APP_FAMILY_SERVICE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error("Credenciales inválidas");
            }

            const data = await res.text();
            localStorage.setItem("token", data); // Guarda el token
            const tokeninfo = decodeJWT(data);
            if(tokeninfo) setUser(tokeninfo);
        } catch (err) {
            alert("Error al iniciar sesión");
            console.error(err);
        }
    };

    if (!user) {
        return <LoginForm onLogin={handleLogin} />;
    }

    return <SessionContext.Provider value={
        {user}
    }>{children}</SessionContext.Provider>;
}

const decodeJWT = (token: string) => {
    try {
        const decoded: JwtPayload = jwtDecode(token);

        // Si el token expiró, lo borramos
        if (decoded.expiresAt * 1000 < Date.now()) {
            localStorage.removeItem("token");
        } else {
            return {
                name: decoded.name,
                email: decoded.email,
                surname: decoded.surname,
                id: decoded.userId
            }
        }
    } catch (err) {
        console.error("Token inválido", err);
    }
}

function LoginForm({ onLogin }: { onLogin: (email: string, password: string) => void }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow-md w-80 space-y-4">
                <h2 className="text-xl font-bold text-center">Iniciar Sesión</h2>
                <input
                    type="email"
                    placeholder="Correo"
                    className="w-full border rounded px-3 py-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full border rounded px-3 py-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    onClick={() => onLogin(email, password)}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Entrar
                </button>
            </div>
        </div>
    );
}
export const useSessionContext = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useCategory must be used within a categoryProvider");
    }
    return context;
}
