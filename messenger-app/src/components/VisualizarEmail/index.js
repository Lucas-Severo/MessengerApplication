import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPaginaAtual } from '../../actions'
import axios from '../../utils/axios'
import './style.css'

function VisualizarEmail() {
    const { emailId, token, tipoVisualizacao } = useSelector(state => state)
    const [email, setEmail] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        async function buscarEmail() {
            const config = {
                headers: {
                   Authorization: token || localStorage.getItem('token') 
                }
            }
            axios.get('/emails/' + emailId, config)
            .then(response => {
                setEmail(response.data)
            })
        }
        async function visualizarEmail() {
            const config = {
                headers: {
                   Authorization: token || localStorage.getItem('token') 
                }
            }
            if(tipoVisualizacao === 'recebido') {
                axios.put('/emails/visualizar/' + emailId, {}, config)
            }
        }
        buscarEmail()
        visualizarEmail()
    }, [emailId, token, tipoVisualizacao])

    function handleSair() {
        const pagina = tipoVisualizacao === 'recebido' ? 'entrada' : 'enviados'
        dispatch(setPaginaAtual(pagina))
    }

    return (
        <div className="m-2 visualizar">
            <button onClick={handleSair} className="btn btn-primary botao mb-2"><i class="fas fa-arrow-left me-2"></i>Voltar</button>
            <h2>{email.assunto}</h2>
            <p>De: {tipoVisualizacao === 'recebido' ? (email.destinatario && email.destinatario.email) : (email.remetente && email.remetente.email)}</p>
            <p>Para: {tipoVisualizacao === 'recebido' ? (email.remetente && email.remetente.email) : (email.destinatario && email.destinatario.email)}</p>
            <p>{email.mensagem}</p>
        </div>
    )
}

export default VisualizarEmail