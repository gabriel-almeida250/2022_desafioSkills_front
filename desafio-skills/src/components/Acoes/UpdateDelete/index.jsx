import { useState } from "react";
import edit from "../../../assets/img/pencil.png";
import './styles.css';
import Delete from "../Delete";
import ModalUpdateSkill from "../../Modals/ModalUpdateSkill";

function UpdateDelete({ identificador, identificadorId, nomeDeletado  }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const abrirModal = () => {
        handleShow()
    }
    return (
        <div>
            <div className="botoesAcoesAtivar">
                <div className="editAcoes" onClick={() => abrirModal()} title="Editar Skill">
                    <img style={{ cursor: 'pointer' }} src={edit} alt="edit" width={24}/>
                </div>
                <ModalUpdateSkill show={show} handleClose={handleClose} identificadorId={identificadorId} />
                <Delete identificador={identificador} nomeDeletado={nomeDeletado}/>
            </div>
        </div>
    )
}

export default UpdateDelete;