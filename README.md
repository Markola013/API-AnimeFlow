# 🎌 AnimeFlow - Sistema de Gerenciamento de Animes

Esta aplicação é uma **Single Page Application (SPA)** completa para o gerenciamento de coleções de animes, desenvolvida para a disciplina de SPA do 3º Semestre de Sistemas para Internet.

---

## 📋 Requisitos da Rubrica Implementados

### 💻 Back-end (API)
* **Endpoints CRUD**: Implementação dos 4 verbos HTTP (GET, POST, PUT, DELETE).
* **Status HTTP**: Respostas em JSON com status adequados (200 OK, 201 Created, 204 No Content).
* **Tecnologia**: Node.js com Express (Linguagem de preferência do aluno).

### ⚛️ Front-end (React 19)
* **Hook `use()`**: Consumo da API utilizando o novo hook `use()` do React 19.
* **Suspense & Fallback**: Utilização de `<Suspense>` com componente de fallback para carregamento.
* **CRUD Completo**: Interface funcional para Criar, Ler, Atualizar e Deletar.
* **Interface UI**: Layout limpo, responsivo e organizado utilizando Tailwind CSS.
* **Feedback ao Usuário**: Alertas visuais confirmando o sucesso de cada operação.

---

## 🛠️ Como Executar o Projeto

### 1. Pré-requisitos
* Node.js instalado na máquina.

### 2. Executando o Back-end (API)

1. Navegue até a pasta da API:
  
   * cd api-animes

2. Instale as dependências:

    * npm install

3. Inicie a aplicação:

    npm run dev

### 3. Executando o Front-end

1. Em um novo terminal, navegue até a pasta do front-end:

    * cd front-anime-manager

2. Instale as dependências:

    * npm install

3. Inicie a aplicação:

    * npm run dev