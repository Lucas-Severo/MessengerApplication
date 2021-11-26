export function setUsuario(usuario) {
    return {
        type: "SET_USUARIO",
        payload: usuario
    }
}

export function setPaginaAtual(paginaAtual) {
    return {
        type: "SET_PAGINA_ATUAL",
        payload: paginaAtual
    }
}

export function setEmailsRecebidos(emailsRecebidos) {
    return {
        type: "SET_EMAILS_RECEBIDOS",
        payload: emailsRecebidos
    }
}

export function setEmailsEnviados(emailsEnviados) {
    return {
        type: "SET_EMAILS_ENVIADOS",
        payload: emailsEnviados
    }
}

export function setToken(token) {
    return {
        type: "SET_TOKEN",
        payload: token
    }
}

export function setEmailId(emailId) {
    return {
        type: "SET_EMAIL_ID",
        payload: emailId
    }
}

export function setTipoVisualizacao(tipoVisualizacao) {
    return {
        type: "SET_TIPO_VISUALIZACAO",
        payload: tipoVisualizacao
    }
}