import React, {useState, useContext} from "react";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { AuthContext } from "../../contexts/auth";

import "./styles.css";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

const Login = () => {
  
  const { login } = useContext(AuthContext);

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
   
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", { usuario, senha });
    
    login(usuario, senha);

  };

  // function mostrarSenha() {
  //   var tipo = document.getElementById("senha");
  //   if (tipo.type === "password") {
  //     tipo.type = "text";
  //   } else {
  //     tipo.type = "password";
  //   }
  // }

  const [valuesSenha, setValuesSenha] = React.useState({
    senha: "",
    showSenha: false,
  });

  const handleClickShowPassword = () => {
    setValuesSenha({ ...valuesSenha, showSenha: !valuesSenha.showSenha });
  };

  return (
    <>
    <Header />
    <div id="login">
      <h1 className="title">Login do Sistema</h1>
        <form className="form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <Input type="text" name="email" id="email" 
              value={usuario} onChange={(e) => setUsuario(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="password">Senha</label>
              <Input
              type={valuesSenha.showSenha ? "text" : "password"} 
              name="senha" id="senha" 
              value={senha} onChange={(e) => setSenha(e.target.value)}
              endAdornment={
                <inputAdornment>
                  <IconButton onClick={handleClickShowPassword}>
                    {valuesSenha.showSenha ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </inputAdornment>
              }
              />
              {/* <button onClick={mostrarSenha} label="Mostrar senha" /> */}
            </div>
            <div className="actions">
              <button type="submit">Entrar</button>
            </div>
            <div className="linkCadastro">
            <Link className="link" to="/registro" >Clique aqui para fazer o cadastro</Link>
            </div>
        </form>
    </div>
    </>
  );
};

export default Login;