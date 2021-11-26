const INITIAL_STATE = {
    usuario: {},
    paginaAtual: 'entrada',
    emailsRecebidos: [],
    emailsEnviados: [],
    token: '',
    emailId: '',
    tipoVisualizacao: ''
}

function reducer(state = INITIAL_STATE, action) {
    switch(action.type){
        case "SET_USUARIO":
            return {
                ...state,
                usuario: action.payload
            }
        case "SET_PAGINA_ATUAL":
            return {
                ...state,
                paginaAtual: action.payload
            }
        case "SET_EMAILS_RECEBIDOS":
            return {
                ...state,
                emailsRecebidos: action.payload
            }
        case "SET_EMAILS_ENVIADOS":
            return {
                ...state,
                emailsEnviados: action.payload
            }
        case "SET_TOKEN":
            return {
                ...state,
                token: action.payload
            }
        case "SET_EMAIL_ID":
            return {
                ...state,
                emailId: action.payload
            }
        case "SET_TIPO_VISUALIZACAO":
            return {
                ...state,
                tipoVisualizacao: action.payload
            }
        default:
            return state
    }
}

export default reducer