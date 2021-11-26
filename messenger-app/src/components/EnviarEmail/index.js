import './style.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

function EnviarEmail() {
    const [rementente, setRemetente] = useState('')
    const [assunto, setAssunto] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [mensagemErro, setMensagemErro] = useState('')
    const [enviado, setEnviado] = useState(false)
    const { usuario } = useSelector(state => state)

    function handleEnviar() {
        if(camposValidos()) {
            limparCampos()
            setEnviado(true)
            const email = {
                assunto,
                mensagem,
                destinatario: 1,
                remetente: 2
            }
            const config = {
                headers: {
                   Authorization: usuario.token || localStorage.getItem('token') 
                }
            }
            axios.post('http://localhost:1337/emails/', email, config).then(response => {
                console.log(response)
            })
        }
    }

    function camposValidos() {
        if(!rementente) {
            setMensagemErro('Campo remetente não preenchido!')
            return false
        } else if(!assunto) {
            setMensagemErro('Campo assunto não preenchido!')
            return false
        } else if(!mensagem) {
            setMensagemErro('Campo de mensagem não preenchido!')
            return false
        }
        setMensagemErro('')
        return true
    }

    function limparCampos() {
        setRemetente('')
        setAssunto('')
        setMensagem('')
    }

    return (
        <div className="envio ps-3 pe-3">
            <div className="input-group d-flex align-items-center border-bottom mt-2">
                <label>Para: </label>
                <input value={rementente} onChange={event => setRemetente(event.target.value)} className="shadow-none form-control border-0" type="text"></input>
            </div>
            <div className="input-group d-flex align-items-center border-bottom mt-2">
                <label>Assunto: </label>
                <input value={assunto} onChange={event => setAssunto(event.target.value)} className="shadow-none form-control border-0" type="text"></input>
            </div>
            <div className="border-bottom">
                <textarea value={mensagem} onChange={event => setMensagem(event.target.value)} className="ps-0 shadow-none form-control resize-none border-0" rows="10"></textarea>
            </div>
            { mensagemErro && <p className="text-danger mt-1">{mensagemErro}</p> }
            { enviado && <p className="text-success mt-1">E-mail enviado com sucesso!</p> }
            <div className="mt-2">
                <button onClick={handleEnviar} className="btn btn-primary botao me-2"><i className="fas fa-share-square me-2"></i>Enviar</button>
                <button className="btn btn-danger botao"><i className="fas fa-trash me-2"></i>Descartar</button>
            </div>
        </div>
    )
}

export default EnviarEmail