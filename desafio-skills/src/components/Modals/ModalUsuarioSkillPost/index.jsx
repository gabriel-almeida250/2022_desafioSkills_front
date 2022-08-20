import { Modal, Form, Button } from "react-bootstrap";
import "./styles.css"
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Input from "@material-ui/core/Input";
import { API } from "../../../services/api";

export default function ModalUsuarioSkillPost({ show, handleClose, idUsuario }) {
    const [id, setId] = useState();
    const [idSkill, setIdSkill] = useState(1);
    const [knowledgeLevel, setKnowledgeLevel] = useState();
    var navigate = useNavigate();
    const [skill, setSkill] = useState([]);


    const atualizar = () => {
        handleClose()
        navigate({ replace: true });
        setTimeout(() => {
            window.location.reload();
        }, 800);
    }

    useEffect(() => {
        const pegarDados = async () => {
          await API.get(`/api/skill/listarTodos`)
            .then((response) => setSkill(response.data))
            .catch((err) => {
              console.error("ops! ocorreu um erro" + err);
            });
        };
        pegarDados();
      }, []); 
    

    const token = localStorage.getItem('token')

    function cadastrarUsuarioSkill(e) {
        e.preventDefault();
        API.post(`api/usuario_skill/salvar`, {
            usuario: {
                id: `${idUsuario}`
            },
            skill: {
                idSkill: idSkill
            },
            knowledgeLevel: knowledgeLevel,
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token ,
                    Accept: 'application/json',
                  },
            },
        )
            .then(response => {
                console.log(response.data)
                atualizar()
            })
            .catch(function (error) {
                if (error.response.status === 400) {
                    alert('Informações inválidas!');
                } else if (error.response.status === 500) {
                    alert('Erro interno de servidor!');
                }
            });
    }

    const options = skill.map(item => {
        return {
            label: item.name,
            value: JSON.parse(+item.idSkill)    
        }   
    })
  
    return (
        <Modal className="containerModal" show={show} onHide={handleClose}>
            <button className="close" onClick={handleClose}>
                <h3>X</h3>
            </button>
            <Modal.Body className='modalBody'>
                <Form>
                    <div className="inputFlex">
                        <div className="styleDiv">
                    <select
                        value={idSkill}
                    onChange={e => setIdSkill(e.target.value)}>
                        {options.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                         ))}
                        </select>
                        </div>
                        <div className="styleDiv">
                            <div className="informacoesAlteradas"><b>KnowledgeLevel*</b></div>
                            <Input
                                type="text"
                                placeholder="Descrição"
                                required
                                onChange={(e) => setKnowledgeLevel(e.target.value)}
                            />
                        </div>
                    </div>
                    <Modal.Footer className="modalFooter">
                        <div>
                            <div className="containerBotoesModal">
                                <button
                                    className='botoesModal botaoAtualizar'
                                    onClick={(e) => cadastrarUsuarioSkill(e)}
                                >
                                    Cadastrar
                                </button>
                            </div>
                        </div>
                        <div className="containerBotoesModal">
                            <button className='botoesModal botaoCancelar' onClick={handleClose}  >
                                Cancelar
                            </button>
                        </div>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
}