import { Component } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import './style.css'

class Cadastro extends Component {

    constructor(props) {
        super(props)
        this.state = {
            senhaInvalida: false,
            cadastrado: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault()
        if(this.state.senha !== this.state.senhaRepetida) {
            this.setState({senhaInvalida: true})
        }else{
            this.setState({senhaInvalida: false})
            this.setState({cadastrado: true})
            await axios.post('http://localhost:1337/usuarios', this.state)
        }
    }

    handleChangeInformacoes({target}, campo) {
        this.setState({[campo]: target.value})
    }
    
    render() {
        const { cadastrado } = this.state
        if(cadastrado) {
            return <Navigate to='/'/>;
        }
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <div className="d-flex flex-column align-items-center">
                    <h2>Messanger APP</h2>
                    <form onSubmit={this.handleSubmit} className="d-flex flex-column border border-2 rounded p-5">
                        <div className="w-100 h-100 d-flex justify-content-center">
                            <h4>Cadastrar</h4>
                        </div>
                        <label htmlFor="nome">Nome</label>
                        <input 
                            value={this.state.nome || ''} 
                            onChange={event => {this.handleChangeInformacoes(event, "nome")}} 
                            className="form-control" 
                            type="text" 
                            id="nome" 
                            required
                        />
                        <label htmlFor="Sobrenome">Sobrenome</label>
                        <input 
                            value={this.state.sobrenome || ''} 
                            onChange={event => {this.handleChangeInformacoes(event, "sobrenome")}} 
                            className="form-control" 
                            type="text" 
                            id="sobrenome" 
                            required
                        />
                        <label htmlFor="email">E-mail</label>
                        <input 
                            value={this.state.email || ''} 
                            onChange={event => {this.handleChangeInformacoes(event, "email")}} 
                            className="form-control" 
                            type="email" 
                            id="email" 
                            required
                        />
                        <label htmlFor="senha">Senha</label>
                        <input 
                            value={this.state.senha || ''} 
                            onChange={event => {this.handleChangeInformacoes(event, "senha")}} 
                            className="form-control" 
                            type="password" 
                            id="senha" 
                            required
                        />
                        <label htmlFor="repitaSenha">Repita a senha</label>
                        <input 
                            value={this.state.senhaRepetida || ''} 
                            onChange={event => {this.handleChangeInformacoes(event, "senhaRepetida")}} 
                            className="form-control" 
                            type="password" 
                            id="repitaSenha" 
                            required
                        />
                        <a href="/" className="text-decoration-none mt-2 mb-2">Já tenho uma conta</a>
                        <button className="btn btn-primary">Cadastrar-se</button>
                        {this.state.senhaInvalida && <p className="senhaNaoIgual mb-1 mt-1">Senha não iguais. Tente novamente</p>}
                    </form>
                </div>
            </div>
        )
    }

}

export default Cadastro