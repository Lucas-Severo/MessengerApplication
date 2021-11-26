import { useSelector, useDispatch } from 'react-redux'
import { setEmailId, setPaginaAtual, setTipoVisualizacao, setEmailsEnviados } from '../../actions'
import { useEffect } from 'react'
import axios from 'axios'
import './style.css'

function Enviados() {
    const { emailsEnviados, token } = useSelector(state => state)
    const dispatch = useDispatch()

    function handleVisualizar(event, emailId) {
        event.preventDefault()
        dispatch(setEmailId(emailId))
        dispatch(setTipoVisualizacao('enviado'))
        dispatch(setPaginaAtual('visualizarEmail'))
    }

    useEffect(() => {
        async function buscarEmailsEnviados() {
            const config = {
                headers: {
                   Authorization: token || localStorage.getItem('token') 
                }
            }
            axios.get('http://localhost:1337/emails/enviados', config)
            .then(response => {
                dispatch(setEmailsEnviados(response.data.emails))
            })
        }
        buscarEmailsEnviados()
    }, [token, dispatch])

    return (
        <div className="listagem pt-2 list-group">
            {emailsEnviados.length !== 0 ? emailsEnviados.map((email, index) => {
                return (
                <div key={index} className="listagem border-bottom">
                    <a onClick={event => handleVisualizar(event, email.id)} className="bg-none list-group-item list-group-item-action border-0 d-flex justify-content-between row" href="/#">
                        <p className="col-1 mb-0">{email.remetente.nome}</p>
                        <p className="col-7 mb-0">{email.assunto}</p>
                        <div className="col-2 d-flex justify-content-end">
                            <p className="mb-0">{new Date(email.createdAt).toLocaleDateString('pt-br', {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'})}</p>
                        </div>
                    </a>
                </div>
            )}) : (
                <div className="m-auto d-flex flex-column align-items-center">Não há e-mails recebidos<i className="far fa-sticky-note h1"></i></div>
            )}
        </div>
    )
}

export default Enviados