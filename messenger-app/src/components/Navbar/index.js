import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import { setToken } from '../../actions'

function Navbar() {
    const { usuario } = useSelector(state => state)
    const dispatch = useDispatch()

    function handleSair() {
        dispatch(setToken(null))
        localStorage.removeItem('token')
    }

    return (
        <div className="bg-primary d-flex justify-content-between align-items-center navbar">
            <p className="m-0 ps-4 text-white"><strong>Messenger APP</strong></p>
            <div className="d-flex pe-4 h-100 align-items-center">
                <p className="m-0 text-white me-3">{usuario && usuario.nome}</p>
                <button onClick={handleSair} className="m-0 btn btn-outline-danger" href="/#">Sair</button>
            </div>
        </div>
    )
}



export default Navbar