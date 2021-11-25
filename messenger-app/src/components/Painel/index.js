import Navbar from "../Navbar"
import Menu from "../Menu"
import Entrada from '../Entrada'
import Enviados from '../Enviados'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setEmailsEnviados, setEmailsRecebidos } from '../../actions'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

function Painel() {
    const { paginaAtual } = useSelector(state => state)
    const { usuario } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        async function buscarEmailsRecebidos() {
            const config = {
                headers: {
                   Authorization: usuario.token || localStorage.getItem('token') 
                }
            }
            axios.get('http://localhost:1337/emails/', config)
            .then(response => {
                dispatch(setEmailsRecebidos(response.data.emails))
            })
        }
        async function buscarEmailsEnviados() {
            const config = {
                headers: {
                   Authorization: usuario.token || localStorage.getItem('token') 
                }
            }
            axios.get('http://localhost:1337/emails/', config)
            .then(response => {
                dispatch(setEmailsEnviados(response.data.emails))
            })
        }
        buscarEmailsRecebidos()
        buscarEmailsEnviados()
    }, [usuario.token, dispatch])

    function getToken() {
        return usuario.token || localStorage.getItem('token') 
    }

    return !getToken() ? (<Navigate to='/'/>) : (
        <>
            <Navbar/>
            <div className="d-flex">
                <Menu/>
                {
                    {
                        'entrada': <Entrada/>,
                        'enviados': <Enviados/>
                    }[paginaAtual]
                }
            </div>
        </>
    )
}

export default Painel