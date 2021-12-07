import './style.css'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setEmailsRecebidos, setEmailsEnviados } from '../../actions'
import axios from '../../utils/axios'

function EnviarEmail() {
    const [rementente, setRemetente] = useState('')
    const [assunto, setAssunto] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [mensagemErro, setMensagemErro] = useState('')
    const [enviado, setEnviado] = useState(false)
    const { token, usuario } = useSelector(state => state)
    const dispatch = useDispatch()

    async function handleEnviar() {
        if(camposValidos()) {
            const remetenteId = await buscarRemetente()
            if(!remetenteId) return
            const email = {
                assunto,
                mensagem,
                destinatarioId: remetenteId,
                remetenteId: usuario.id
            }
            const config = {
                headers: {
                   Authorization: token || localStorage.getItem('token') 
                }
            }
            axios.post('/emails/', email, config)
            setEnviado(true)
            setMensagemErro('')
            buscarEmails()
            limparCampos()
        }
    }

    function buscarEmails() {
        buscarEmailsRecebidos()
        buscarEmailsEnviados()
    }

    async function buscarEmailsRecebidos() {
        const config = {
            headers: {
                Authorization: token || localStorage.getItem('token') 
            }
        }
        axios.get('/emails/recebidos', config)
        .then(response => {
            dispatch(setEmailsRecebidos(response.data.emails))
        })
    }
    async function buscarEmailsEnviados() {
        const config = {
            headers: {
                Authorization: token || localStorage.getItem('token') 
            }
        }
        await axios.get('/emails/enviados', config)
        .then(response => {
            dispatch(setEmailsEnviados(response.data.emails))
        })
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

    async function buscarRemetente() {
        const config = {
            headers: {
               Authorization: token || localStorage.getItem('token') 
            }
        }
        try {
            const response = await axios.get('/usuarios/email/' + rementente, config)
            return response.data.id
        } catch(e) {
            setMensagemErro('Rementente inválido')
            setEnviado(false)
        }
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
                <button onClick={limparCampos} className="btn btn-danger botao"><i className="fas fa-trash me-2"></i>Descartar</button>
            </div>
        </div>
    )
}

export default EnviarEmail