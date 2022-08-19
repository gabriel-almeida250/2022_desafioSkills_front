import React, { createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { API, criarLogin } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recuperarUsuario = localStorage.getItem('login');
        const token = localStorage.getItem("token");

        if (recuperarUsuario && token) {
            setUser(JSON.parse(recuperarUsuario))
            API.defaults.headers.Authorization = `Bearer ${token}`

        }

        setLoading(false);
    }, [])

    const login = async (login, senha) => {
        const response = await criarLogin(login, senha);

        console.log("login", response.data);

        const usuarioLogado = response.data.login;
        const token = response.data.token;

        localStorage.setItem("login", JSON.stringify(usuarioLogado));
        localStorage.setItem("token", token);

        API.defaults.headers.Authorization = `Bearer ${token}`

            setUser({usuarioLogado})
            navigate("/");
    };

    const logout = () => {
    console.log("logout");
    localStorage.removeItem("login")
    localStorage.removeItem("token")
    API.defaults.headers.Authorization = null;
    setUser(null);
    navigate("/login");

    };
    return (
        <AuthContext.Provider value={{authenticated: !!user, user, loading, login, logout}}
        >{children}
        </AuthContext.Provider>
    )
}