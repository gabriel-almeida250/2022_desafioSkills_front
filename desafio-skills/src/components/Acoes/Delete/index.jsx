import { useState } from "react";
import lixeira from "../../../assets/img/delete.png";
import './styles.css';
import { useNavigate } from "react-router-dom";
import ModalDelete from "../../Modals/ModalDelete";
import { API } from "../../../services/api";

function Delete({ identificador, nomeDeletado,  identificadorId}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var navigate = useNavigate();

    const abrirModal = () => {
        handleShow()
    }

    function deletar(e) {
        e.preventDefault();
        API.delete(`/api/usuario_skill/${identificador}`)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))
            handleClose()
            navigate({ replace: true });
            window.location.reload();
    }

    return (
        <div>
            <div className="botoesAcoes">
                <div className="deleteAcoes" onClick={() => abrirModal()} title="Deletar Skill">
                    <img src={lixeira} style={{ cursor: 'pointer' }} alt="del" width={24}/>
                </div>
                <ModalDelete acao={(e) => deletar(e)} show={show} handleClose={handleClose} title= {`DELETAR ${nomeDeletado.toUpperCase()} ?`}
                    texto={`Você tem certeza que deseja deletar a Skill ${nomeDeletado}?`} />
            </div>
        </div>
    )
}

export default Delete;