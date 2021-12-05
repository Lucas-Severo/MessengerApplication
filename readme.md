Messenger APP :iphone: :left_right_arrow: :iphone:

O objetivo desse projeto é utilizar de uma API REST para a comunicação entre clientes, podendo assim que várias instâncias de um aplicativo possam se integrar com esse servidor central

### Requisitos

- NodeJS
- NPM

### Estrutura

O projeto é composto de dois projetos internos, o `messenger-api` que é a aplicação servidor, que receberá e controlará as requisições, e o `messenger-app` que é a aplicação cliente que será utilizada apenas como uma interface que consome as informações da API

### Instalação

Para a preparação de ambos o projeto é necessário entrar dentro de cada projeto e executar o comando

```npm install```

Com isso, todas as dependências dos projetos serão baixadas

### Execução

1) Execute o projeto `messenger-api` com o comando `npm start`, para que dessa forma as estrutura do banco seja construída

2) Execute em seguida o projeto `messenger-app` com o comando `npm start`

O projeto api será executado na porta `1337` por padrão, e o app na porta `3000`

