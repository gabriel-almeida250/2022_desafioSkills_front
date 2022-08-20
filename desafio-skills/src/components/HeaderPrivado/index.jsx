import React, { useContext } from "react";
import "./styles.css";

import { AuthContext } from "../../contexts/auth";



function HeaderPrivado() {

  const { logout } = useContext(AuthContext);

const handleLogout = () => {
  logout();
}
  return (
    <>
    <div className='header'>
        <h1>Desafio Skill</h1>
        <button className="button" onClick={() => handleLogout()}>Sair</button>
    </div>
    </>
  );
}

export default HeaderPrivado;