import axios from "axios";

export const API = axios.create({
    baseURL: "http://localhost:8080"

})

export const criarLogin = async (login, senha) => {
    return API.post('/autenticacao', {login, senha}).catch(function (error) {
        if (error.response.status === 403) {
          alert('Usuário e/ou senha inválido(s)!');
        } else if (error.response.status === 500) {
          alert('Erro interno de servidor!');
        }
      });
}

export const getUsuarios = async() => {
    return API.get('api/usuario/listarTodos')
}

