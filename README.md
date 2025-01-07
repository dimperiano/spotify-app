# Spotify Challenge

## Descrição

Este projeto foi desenvolvido como parte de um desafio técnico para criar uma aplicação que utiliza a Spotify Web API. O objetivo principal é fornecer uma interface funcional e intuitiva para exibir informações de artistas, álbuns e playlists, além de permitir a criação de playlists personalizadas e exibir informações detalhadas do usuário autenticado.

A aplicação foi construída utilizando React, Next.js, Tailwind CSS, React Query e Material UI, seguindo o protótipo funcional proposto no Figma. Durante o desenvolvimento, priorizei manutenibilidade, escalabilidade e desempenho.

O projeto adota uma arquitetura modular, que organiza o conteúdo de cada página do site em módulos independentes. Essa abordagem simplifica a manutenção e facilita o trabalho em equipe, permitindo que diferentes grupos de desenvolvedores sejam responsáveis por evoluir módulos específicos de forma eficiente e organizada.

## Requisitos

### Requisitos obrigatórios

- [x] Segmentação de commits
- [x] Lint
- [x] Autenticação via Spotify
- [x] Listar artistas
- [x] Listar álbuns de um artista
- [x] Utilizar paginação (scroll infinito ou não) | Scroll infinito a cada 10 itens
- [ ] Funcionamento offline
- [x] Testes unitários
- [x] Deploy da aplicação | Hospedado em https://spotify-challenge-imperiano.vercel.app

### Bônus

- [ ] Testes E2E
- [ ] Integração com Sentry
- [ ] CI/CD
- [x] Responsividade (celular e tablet)
- [ ] Qualidade de código (Sonarqube)
- [ ] PWA

## Tecnologias Utilizadas

- **React**: Framework para a construção da interface do usuário.
- **React Query**: Gerenciamento de estado e cache para requisições API.
- **Tailwind CSS**: Framework de estilos para garantir consistência na interface.
- **Jest e Testing Library**: Para testes unitários.
- **Cypress**: Testes de ponta a ponta.
- **Sentry**: Monitoramento de erros em tempo real.
- **Workbox**: Configuração de PWA e cache offline.
- **GitHub Actions**: CI/CD para integração e deploy contínuos.

## Configuração e Execução

### Pré-requisitos

- Node.js (versão 16 ou superior)
- Crie um app no [Spotify Developer](https://developer.spotify.com/documentation/web-api/tutorials/getting-started#create-an-app) com Client ID, Client Secret e cadastre "http://localhost:3000/callback" no campo "Redirect URIs"
- Duplique o arquivo env.example, renomeie para .env.local e preencha as variáveis

### Passos para Executar

Clone o repositório

```bash
git clone https://github.com/dimperiano/spotify-challenge.git
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
