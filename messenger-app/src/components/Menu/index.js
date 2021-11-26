import './style.css'
import { useDispatch , useSelector} from 'react-redux'
import { setPaginaAtual } from '../../actions'

function Menu() {
    const { emailsRecebidos, emailsEnviados } = useSelector(state => state)

    const dispatch = useDispatch()

    function handleChangePaginaAtual(event, pagina) {
        const paginaRenderizada  = pagina || 'entrada'
        const opcoes = document.querySelectorAll('.opcoes')
        for(let opcao of opcoes) {
            opcao.classList.add('text-dark')
        }
        const elemento = document.querySelector(`#${paginaRenderizada}`)
        if(elemento) elemento.classList.remove('text-dark')
        mudarPagina(event, paginaRenderizada)
    }

    function mudarPagina(event, pagina) {
        if(event) event.preventDefault()
        dispatch(setPaginaAtual(pagina))
    }

    return (
        <div className="menu d-flex flex-column justify-content-start border-end">
            <div className="d-flex flex-column align-items-center w-100 mt-2">
                <button onClick={event => handleChangePaginaAtual(event, "enviar")} className="btn btn-primary botaoNovo"><i className="fas fa-pencil-alt me-1"></i>Nova mensagem</button>
            </div>
            <a id="entrada" onClick={event => handleChangePaginaAtual(event, "entrada")} className="opcoes ps-4 pt-3 text-decoration-none border-bottom d-flex justify-content-between" href="/#">
                <p  className="text-over-flow me-1 mb-0"><i className="far fa-envelope me-1"></i> Caixa de entrada</p>
                <strong className="me-4">{emailsRecebidos.length}</strong>
            </a>
            <a id="enviados" onClick={event => handleChangePaginaAtual(event, "enviados")} className="opcoes ps-4 pt-3 text-decoration-none border-bottom d-flex justify-content-between text-dark" href="/#">
                <p className=" text-over-flow me-1 mb-0"><i className="far fa-paper-plane me-2"></i>Itens enviados</p>
                <strong className="me-4">{emailsEnviados.length}</strong>
            </a>
        </div>
    )
}

export default Menu