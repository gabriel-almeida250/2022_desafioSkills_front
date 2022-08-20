import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import ModalUsuarioSkillPost from "../../components/Modals/ModalUsuarioSkillPost";
import add from "../../assets/img/icon-add.png";
import "./styles.css";
import { API } from "../../services/api";
import HeaderPrivado from "../../components/HeaderPrivado";
import UpdateDelete from "../../components/Acoes/UpdateDelete";

const Home = () => {

const [user, setUser] = useState('');
const usuarioLogado = localStorage.getItem('login')

useEffect(() => {
    const pegarDados = async () => {
      await API.get(`/api/usuario/usuarioAchado/${JSON.parse(usuarioLogado)}`)
        .then((response) => setUser(response.data))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    };
    pegarDados();
  }, []); 

  console.log("here "+user.id);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const abrirModal = () => {
      handleShow()
  }


return (
  <>
  <HeaderPrivado />
   <div className="adicionarSkill" onClick={() => abrirModal()} title='Adicionar Skill'>
                    <img src={add} />
                </div>
                <ModalUsuarioSkillPost show={show} handleClose={handleClose} idUsuario={user.id}/>
    <div className="card" style={{ borderBottomWidth: "0", borderTopWidth: "0"}}>
      {user.usuarioSkill !== undefined && (
        <Container>
        <div className="container-produto row" >
          {user.usuarioSkill?.map((skill, index) => (
            <Card className="col-lg-auto" key={index} style={{ maxWidth: "200px"}}>
              <Card.Img className="imagem-card"
                variant="top"
                src={skill.skill.imageUrl.toString()}
                alt={skill.skill.description}
              />
              <Card.Body>
                <Card.Title>{skill.skill.name}</Card.Title>
                <Card.Text>{skill.skill.versao}</Card.Text>
                <Card.Text>{skill.skill.description}</Card.Text>
                <Card.Text>{skill.knowledgeLevel}</Card.Text>
                <UpdateDelete identificador={skill.usuarioSkillId} nomeDeletado={skill.skill.name} identificadorId={skill.skill.idSkill} />
              </Card.Body>
            </Card>
          ))}
        </div>
        </Container>
      )}
    </div>
    </>
  );
};

export default Home;