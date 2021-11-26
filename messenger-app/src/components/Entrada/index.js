import { useSelector } from 'react-redux'
import './style.css'

function Entrada() {
    const { emailsRecebidos } = useSelector(state => state)

    return (
        <div className="listagem pt-2">
            {emailsRecebidos.length !== 0 ? emailsRecebidos.map((email, index) => {
                return (
                <div className="border-bottom naoLida">
                    <a key={index} className="bg-none list-group-item list-group-item-action border-0 d-flex justify-content-between row" href="/#">
                        <strong className="col-1">{email.destinatario}</strong>
                        <strong className="col-7">{email.assunto}</strong>
                        <strong className="col-1">{new Date(email.createdAt).toLocaleTimeString()}</strong>
                    </a>
                </div>

            )}) : (
                <div className="m-auto d-flex flex-column align-items-center">Não há e-mails recebidos<i className="far fa-sticky-note h1"></i></div>
            )}
        </div>
    )
}

export default Entrada