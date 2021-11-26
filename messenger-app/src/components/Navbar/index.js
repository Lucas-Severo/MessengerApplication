import './style.css'
import { useSelector } from 'react-redux'

function Navbar() {
    const { usuario } = useSelector(state => state)

    return (
        <div className="bg-primary d-flex justify-content-between align-items-center navbar">
            <p className="m-0 ps-4 text-white"><strong>Messenger APP</strong></p>
            <p className="m-0 pe-4 text-white">{usuario && usuario.nome}</p>
        </div>
    )
}



export default Navbar