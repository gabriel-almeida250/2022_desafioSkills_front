import axios from "axios";

export const API = axios.create({
    baseURL: "http://localhost:8080"

})

export const criarLogin = async (login, senha) => {
    return API.post('/autenticacao', {login, senha});
}


