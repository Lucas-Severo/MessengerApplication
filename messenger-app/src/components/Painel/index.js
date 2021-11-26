import Navbar from "../Navbar"
import Menu from "../Menu"
import Entrada from '../Entrada'
import Enviados from '../Enviados'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setEmailsEnviados, setEmailsRecebidos, setUsuario } from '../../actions'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import EnviarEmail from "../EnviarEmail"
import VisualizarEmail from "../VisualizarEmail"

function Painel() {
    const { paginaAtual } = useSelector(state => state)
    const { token } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        async function buscarEmailsRecebidos() {
            const config = {
                headers: {
                   Authorization: token || localStorage.getItem('token') 
                }
            }
            axios.get('http://localhost:1337/emails/recebidos', config)
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
            axios.get('http://localhost:1337/emails/enviados', config)
            .then(response => {
                dispatch(setEmailsEnviados(response.data.emails))
            })
        }
        async function buscarUsuario() {
            const config = {
                headers: {
                   Authorization: token || localStorage.getItem('token') 
                }
            }
            axios.get('http://localhost:1337/usuarios/token', config)
            .then(response => {
                dispatch(setUsuario(response.data))
            })
        }
        buscarEmailsRecebidos()
        buscarEmailsEnviados()
        buscarUsuario()
    }, [token, dispatch])

    function getToken() {
        return token || localStorage.getItem('token') 
    }

    return !getToken() ? (<Navigate to='/'/>) : (
        <>
            <Navbar/>
            <div className="d-flex">
                <Menu/>
                {
                    {
                        'entrada': <Entrada/>,
                        'enviados': <Enviados/>,
                        'enviar': <EnviarEmail/>,
                        'visualizarEmail': <VisualizarEmail/>
                    }[paginaAtual]
                }
            </div>
        </>
    )
}

export default Painel