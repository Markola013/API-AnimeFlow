# 🎌 AnimeFlow - Sistema de Gerenciamento de Animes

[cite_start]Aplicação Full Stack desenvolvida para a disciplina de **Single Page Application** do 3º Semestre de Sistemas para Internet. [cite_start]O projeto consiste em uma API RESTful consumida por um front-end moderno em **React 19**[cite: 2, 5].

---

## 🚀 Tecnologias Utilizadas

* [cite_start]**Front-end:** React 19 (Vite), Tailwind CSS[cite: 41].
* [cite_start]**Back-end:** Node.js, Express, CORS[cite: 39].
* [cite_start]**Comunicação:** Fetch API com o novo hook `use()` do React 19[cite: 5, 14].

---

## 📋 Requisitos da Rubrica Implementados

### [cite_start]💻 Back-end (API) [cite: 8]
* [cite_start]**CRUD Completo:** Endpoints para GET, POST, PUT e DELETE[cite: 10, 12].
* [cite_start]**Status HTTP:** Respostas adequadas como `201 Created` e `204 No Content`[cite: 11, 22].
* [cite_start]**JSON:** Todas as comunicações seguem o padrão JSON[cite: 11].

### [cite_start]⚛️ Front-end (React 19) [cite: 13]
* [cite_start]**Hook `use()`:** Implementado para consumir a Promise da API de forma nativa[cite: 14, 22].
* [cite_start]**Suspense & Fallback:** Interface exibe estado de carregamento enquanto os dados são buscados[cite: 22].
* [cite_start]**Interface UI:** Layout limpo, responsivo e com alto contraste (Fundo Slate-50)[cite: 15, 23].
* [cite_start]**Feedback ao Usuário:** Alertas visuais confirmando a criação, edição e exclusão de itens.

---

## 🛠️ Como Executar o Projeto

### 1. Clonar o Repositório
```bash
git clone [https://github.com/Markola013/API-AnimeFlow.git](https://github.com/Markola013/API-AnimeFlow.git)
cd API-AnimeFlow