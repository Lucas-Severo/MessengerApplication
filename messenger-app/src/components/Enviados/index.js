import { useSelector } from 'react-redux'
import './style.css'

function Enviados() {
    const { emailsEnviados } = useSelector(state => state)

    return (
        <div className="listagem ps-4 pt-2 list-group">
            {emailsEnviados.length !== 0 ? emailsEnviados.map((email) => {
                return (<a className="list-group-item list-group-item-action d-flex justify-content-between row" href="/#">
                    <strong className="col-1">{email.destinatario}</strong>
                    <strong className="col-7">{email.assunto}</strong>
                    <strong className="col-1">{new Date()}</strong>
                </a>
            )}) : (
                <div className="m-auto d-flex flex-column align-items-center">Não há e-mails enviados<i className="far fa-sticky-note h1"></i></div>
            )}
        </div>
    )
}

export default Enviados