import { Component } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import './style.css'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            informacoesInvalidas: false,
            loginRealizado: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault()
        axios.post('http://localhost:1337/usuarios/login', this.state).then(response => {
            localStorage.setItem('token', response.data.token)
            this.setState({informacoesInvalidas: false})
            this.setState({loginRealizado: true})
        }).catch(() => {
            this.setState({informacoesInvalidas: true})
        })
    }

    handleChangeInformacoes({target}, campo) {
        this.setState({[campo]: target.value})
    }

    render() {
        if(this.state.loginRealizado) {
            return <Navigate to='/painel'/>;
        }        
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <div className="d-flex flex-column align-items-center">
                    <h2>Messanger APP</h2>
                    <form onSubmit={this.handleSubmit} className="d-flex flex-column border border-2 rounded p-5">
                        <div className="w-100 h-100 d-flex justify-content-center">
                            <h4>Entrar</h4>
                        </div>
                        <label htmlFor="email">E-mail</label>
                        <input
                            value={this.state.email || ''}
                            onChange={event => {this.handleChangeInformacoes(event, "email")}} 
                            className="form-control"
                            type="email"
                            id="email"
                        />
                        <label htmlFor="senha">Senha</label>
                        <input
                            value={this.state.senha || ''}
                            onChange={event => {this.handleChangeInformacoes(event, "senha")}} 
                            className="form-control" 
                            type="password" 
                            id="senha"
                        />
    
                        <div className="d-flex justify-content-between mt-3 mb-3">
                            <div className="d-flex align-items-center">
                                <input id="ficarConectado" className="me-2" type="checkbox"/>
                                <label htmlFor="ficarConectado">Ficar conectado</label>
                            </div>
                            <a href="/cadastro" className="text-decoration-none">Criar uma conta</a>
                        </div>
                        <button className="btn btn-primary">Entrar</button>
                        {this.state.informacoesInvalidas && <p className="informacoesInvalidas mb-1 mt-1">E-mail ou senha inválido.</p>}
                    </form>
                </div>
            </div>
        )
    }
    
}

export default Login