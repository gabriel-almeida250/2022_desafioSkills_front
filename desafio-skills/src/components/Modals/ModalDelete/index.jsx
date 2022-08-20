import { Modal, Button } from 'react-bootstrap'
import salvar from "../../../assets/img/check.png";
import cancelar from "../../../assets/img/cancelar.png";
import './styles.css';


function ModalDelete({ show, handleClose, title, texto, acao, tema }) {
    return (
        <Modal style={{ marginTop: "9rem" }} show={show} onHide={handleClose} >
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
                <button className="close" onClick={handleClose}>
                    <b>X</b>
                </button>
            </Modal.Header>
            <b style={{ fontSize: 17, padding: 25 }}>{texto}</b>
                <div className='modalFooter'>
                    <button
                        className="botoesModal" style={{backgroundColor: "green"}}
                        onClick={(e) => acao(e)}
                    >
                        Confirmar
                    </button>
                    <button className="botoesModal" style={{backgroundColor: "red"}} onClick={handleClose}>
                        Cancelar
                    </button>
                    </div>


        </Modal>
    )
}

export default ModalDelete;