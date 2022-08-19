import React from "react";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { API } from "../../services/api";

import * as yup from "yup";

import "./styles.css";


const Register = () => {

    const validationPost = yup.object({
        login: yup.string().required("Campo obrigatório !"),
        senha: yup.string().required("Campo obrigatório !"),
        confirmaSenha: yup.string()
        .oneOf([yup.ref('senha'), null], 'Passwords must match')
      }).required();

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(validationPost),
      });

      const criarUsuario = async (dados, e) => {
        e.preventDefault();
        API.post(`/autenticacao/registro`, {
            login: dados.login,
            senha: dados.senha,
        },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + dados.login.token ,
              Accept: 'application/json',
            },
          },
        )
          .then(response => {
            console.log(response.data)
          })
          .catch(function (error) {
            if (error.response.status === 400) {
              alert('Informações inválidas!');
            } else if (error.response.status === 500) {
              alert('Erro interno de servidor!');
            }
          });
      }

const [valuesSenha, setValuesSenha] = React.useState({
    senha: "",
    showSenha: false,
  });

  const [valuesConfirmaSenha, setValuesConfirmaSenha] = React.useState({
    confirmaSenha: "",
    showConfirmaSenha: false,
  });

  const handleClickShowPassword = () => {
    setValuesSenha({ ...valuesSenha, showSenha: !valuesSenha.showSenha });
  };

  const handleClickShowConfirmaSenha = () => {
    setValuesConfirmaSenha({ ...valuesConfirmaSenha, showConfirmaSenha: !valuesConfirmaSenha.showConfirmaSenha });
  };

  return (
    <div id="login">
      <h1 className="title">Login do Sistema</h1>
        <form className="form" onSubmit={handleSubmit(criarUsuario)}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
              {...register("login")}
              placeholder="login"
              name="login"
            />
            <p className="error-message">{errors.login?.message}</p>
            </div>
            <div className="field">
              <label htmlFor="password">Senha</label>
              <Input
              type={valuesSenha.showSenha ? "text" : "password"}
              {...register("senha")}
              placeholder="senha"
              name="senha"
              endAdornment={
                <inputAdornment>
                  <IconButton onClick={handleClickShowPassword}>
                    {valuesSenha.showSenha ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </inputAdornment>
              }
            />
            <p className="error-message">{errors.senha?.message}</p>
            </div>
            <div className="field">
              <label htmlFor="password">Confirma Senha</label>
              <Input
              type={valuesConfirmaSenha.showConfirmaSenha ? "text" : "password"}
              {...register("confirmaSenha")}
              placeholder="confirmaSenha"
              name="confirmaSenha"
              endAdornment={
                <inputAdornment>
                  <IconButton onClick={handleClickShowConfirmaSenha}>
                    {valuesConfirmaSenha.showConfirmaSenha ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </inputAdornment>
              }
            />
            <p className="error-message">{errors.confirmaSenha?.message}</p>
            </div>
            <div className="actions">
              <button type="submit">Entrar</button>
            </div>
        </form>
    </div>
  );
};

export default Register;