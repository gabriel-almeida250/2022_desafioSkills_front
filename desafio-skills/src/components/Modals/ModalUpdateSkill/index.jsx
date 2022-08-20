import { yupResolver } from '@hookform/resolvers/yup';
import Input from "@material-ui/core/Input";
import { useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { API } from "../../../services/api";
import cancelar from "../../../assets/img/cancelar.png";
import salvar from "../../../assets/img/salvar.png";
import "./styles.css";


export default function ModalUpdateSkill({ show, handleClose, identificadorId }) {
    
    const token = localStorage.getItem("token");
    var navigate = useNavigate();

    const validationPost = yup.object({
        name: yup.string().required("Campo obrigatório !"),
        versao: yup.string().required("Campo obrigatório !"),
        description: yup.string().required("Campo obrigatório !"),
        imageUrl: yup.string().required("Campo obrigatório !"),
      }).required();

    const atualizar = () => {
        handleClose()
        navigate({ replace: true });
            window.location.reload();
    }

    function atualizarSkill(dados, e) {
        e.preventDefault();
        API.put(`/api/skill/update`, {
            idSkill: `${identificadorId}`,
            name: dados.name,
            versao: dados.versao,
            description: dados.description,
            imageUrl: dados.imageUrl,
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

    useEffect(() => {
        API.get(`api/skill/${identificadorId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token ,
            Accept: 'application/json',
          },
        },).then((response) => {
            reset(response.data)
        });
    }, [])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(validationPost),
      });

    return (
        <Modal className="containerModal" show={show} onHide={handleClose}>
            <button className="close" onClick={handleClose}>
                <h3>X</h3>
            </button>
            <Modal.Body className='modalBody'>
            <Form onSubmit={handleSubmit(atualizarSkill)}>
                    <div>
                        <div className="informacoesAlteradas"><b>Nome*</b></div>
                        <Input
                            {...register("name")}
                            type="text"
                            placeholder="Nome"
                        />
                        <p className="error-message">{errors.name?.message}</p>
                    </div>
                    <div className="inputFlex">
                        <div className="styleDiv">
                            <div className="informacoesAlteradas"><b>Versão*</b></div>
                            <Input
                                {...register("versao")}
                                type="text"
                                placeholder="Descrição"
                            />
                            <p className="error-message">{errors.versao?.message}</p>
                        </div>
                        <div className="styleDiv">
                            <div className="informacoesAlteradas"><b>Descrição*</b></div>
                            <Input
                                {...register("description")}
                                type="text"
                                placeholder="Descrição"
                            />
                            <p className="error-message">{errors.description?.message}</p>
                        </div>
                        <div className="styleDiv">
                            <div className="informacoesAlteradas"><b>Imagem(URL)*</b></div>
                            <Input
                                {...register("imageUrl")}
                                type="text"
                                placeholder="URL"
                            />
                            <p className="error-message">{errors.imageUrl?.message}</p>
                        </div>
                    </div>
                    <Modal.Footer className="modalFooter">
              <div className="botaoCadastrar botoesModal">
                <button
                  className='stylesButton'
                  type="submit"
                ><img className="salvar" src={salvar} alt="neki" />
                  Atualizar
                </button>
              </div>
            </Modal.Footer>
          </Form>
          <div>
            <div className="botaoCancelar">
              <button className='stylesButton2' onClick={handleClose}  ><img className="salvar" src={cancelar} alt="neki" />
                Cancelar
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal >
    )
}