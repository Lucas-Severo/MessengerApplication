import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setToken } from '../../actions'
import axios from '../../utils/axios'
import './style.css'

function Login() {
    const [informacoesInvalidas, setInformacoesInvalidas] = useState(false)
    const [loginRealizado, setLoginRealizado] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')
    const [informacoesUsuario, setInformacoesUsuario] = useState({})
    const [manterConectado, setManterConectado] = useState(false)
    const dispatch = useDispatch()

    async function handleSubmit(event) {
        event.preventDefault()
        axios.post('/usuarios/login', informacoesUsuario).then(response => {
            if (manterConectado) {
                localStorage.setItem('token', response.data.token)
            } else {
                localStorage.removeItem('token')
                dispatch(setToken(response.data.token))
            }
            setInformacoesInvalidas(true)
            setLoginRealizado(true)
        }).catch((err) => {
            setInformacoesInvalidas(true)
            setMensagemErro((err.response && err.response.data.message) || "Erro ao tentar conectar-se com o servidor.")
        })
    }

    function handleChangeInformacoes({target}, campo) {
        const dados = Object.assign(informacoesUsuario, {})
        dados[campo] = target.value
        setInformacoesUsuario({...dados})
    }

    function handleChangeManterConectado({target}) {
        setManterConectado(target.checked)
    }
 
    return loginRealizado ? (<Navigate to='/painel'/>) : (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column align-items-center">
                <h2>Messanger APP</h2>
                <form onSubmit={handleSubmit} className="d-flex flex-column border border-2 rounded p-5">
                    <div className="w-100 h-100 d-flex justify-content-center">
                        <h4>Entrar</h4>
                    </div>
                    <label htmlFor="email">E-mail</label>
                    <input
                        value={informacoesUsuario.email || ''}
                        onChange={event => {handleChangeInformacoes(event, "email")}} 
                        className="form-control"
                        type="email"
                        id="email"
                    />
                    <label htmlFor="senha">Senha</label>
                    <input
                        value={informacoesUsuario.senha || ''}
                        onChange={event => {handleChangeInformacoes(event, "senha")}} 
                        className="form-control" 
                        type="password" 
                        id="senha"
                    />

                    <div className="d-flex justify-content-between mt-3 mb-3">
                        <div className="d-flex align-items-center">
                            <input id="ficarConectado" className="me-2" type="checkbox" onChange={handleChangeManterConectado}/>
                            <label htmlFor="ficarConectado">Ficar conectado</label>
                        </div>
                        <a href="/cadastro" className="text-decoration-none">Criar uma conta</a>
                    </div>
                    <button className="btn btn-primary">Entrar</button>
                    {informacoesInvalidas && <p className="text-danger mb-1 mt-1">{mensagemErro}</p>}
                </form>
            </div>
        </div>
    )
    
}

export default Login