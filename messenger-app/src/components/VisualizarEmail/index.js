import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

function VisualizarEmail() {
    const { emailId, token, usuario, tipoVisualizacao } = useSelector(state => state)
    const [email, setEmail] = useState({})

    useEffect(() => {
        async function buscarEmail() {
            const config = {
                headers: {
                   Authorization: token || localStorage.getItem('token') 
                }
            }
            axios.get('http://localhost:1337/emails/' + emailId, config)
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
                axios.put('http://localhost:1337/emails/visualizar/' + emailId, {}, config)
            }
        }
        buscarEmail()
        visualizarEmail()
    }, [emailId, token])

    return (
        <div className="m-2">
            <h2>{email.assunto}</h2>
            <p>Para: {usuario.email}</p>
            <p>{email.mensagem}</p>
        </div>
    )
}

export default VisualizarEmail