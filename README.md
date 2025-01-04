# Spotify Challenge

## Descrição

Este projeto foi desenvolvido como parte de um desafio técnico para criar uma aplicação que utiliza a Spotify Web API. O objetivo principal é fornecer uma interface funcional e intuitiva para exibir informações de artistas, álbuns e playlists, além de permitir a criação de playlists personalizadas e exibir informações detalhadas do usuário autenticado.

A aplicação foi construída utilizando React, Next.js, Tailwind CSS, React Query e Material UI, seguindo o protótipo funcional proposto no Figma. Durante o desenvolvimento, priorizei manutenibilidade, escalabilidade e desempenho.

O projeto adota uma arquitetura modular, que organiza o conteúdo de cada página do site em módulos independentes. Essa abordagem simplifica a manutenção e facilita o trabalho em equipe, permitindo que diferentes grupos de desenvolvedores sejam responsáveis por evoluir módulos específicos de forma eficiente e organizada.

## Funcionalidades

### Requisitos Obrigatórios

- [x] **Autenticação via Spotify:** Integração com o fluxo de autenticação OAuth 2.0.
- [x] **Listar artistas que mais ouvimos:** Utiliza a rota `GET /me/top/artists`.
- [x] **Listar álbuns de um artista:** Utiliza a rota `GET /artists/{id}/albums`.
- [x] **Listar as playlists do usuário:** Utiliza a rota `GET /me/playlists`.
- [x] **Criar uma nova playlist:** Utiliza a rota `POST /users/{user_id}/playlists`.
- [x] **Exibir dados do usuário:** Utiliza a rota `GET /me`.
- [ ] **Paginação:** Implementada para listas com suporte a scroll infinito.
- [ ] **Funcionamento offline:** Cache local para dados essenciais.
- [ ] **Testes unitários:** Cobertura de componentes e lógica crítica com Jest.
- [ ] **Deploy da aplicação:** Hospedado em [URL da aplicação].

### Bônus

- [ ] **Testes E2E:** Automação implementada com Cypress.
- [ ] **Integração com Sentry:** Monitoramento de erros e desempenho.
- [ ] **CI/CD:** Pipeline configurado no GitHub Actions.
- [x] **Responsividade:** Interface otimizada para desktop, tablets e smartphones.
- [ ] **Qualidade de código:** Configuração com SonarQube para análise estática.
- [ ] **PWA:** Aplicação configurada como Progressive Web App.

## Tecnologias Utilizadas

- **React**: Framework para a construção da interface do usuário.
- **React Query**: Gerenciamento de estado e cache para requisições API.
- **Axios**: Biblioteca para chamadas HTTP.
- **Tailwind CSS**: Framework de estilos para garantir consistência na interface.
- **Jest e Testing Library**: Para testes unitários.
- **Cypress**: Testes de ponta a ponta.
- **Sentry**: Monitoramento de erros em tempo real.
- **Workbox**: Configuração de PWA e cache offline.
- **GitHub Actions**: CI/CD para integração e deploy contínuos.

## Configuração e Execução

### Pré-requisitos

- Node.js (versão 16 ou superior)
- Um app criado no [Spotify Developer](https://developer.spotify.com/documentation/web-api/tutorials/getting-started#create-an-app) com Client ID e Client Secret
- Variáveis de ambiente configuradas no arquivo `.env`:
  - `REACT_APP_SPOTIFY_CLIENT_ID`
  - `REACT_APP_SPOTIFY_REDIRECT_URI`

### Passos para Executar

Clone o repositório

```bash
git clone https://github.com/seu-usuario/spotify-challenge.git
cd spotify-challenge
```

Instale as dependências

```bash
npm install
```

Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse no navegador Abra http://localhost:3000 para visualizar o projeto.

#### Para iniciar o servidor em produção

Primeiro rode o comando abaixo para buildar o projeto

```bash
npm run build
```

Em seguida inicie o servidor otimizado para produção

```bash
npm run start
```
