const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Banco de dados temporário (em memória)
let animes = [
    { id: 1, title: "Naruto", genre: "Shonen", episodes: 220 },
    { id: 2, title: "One Piece", genre: "Adventure", episodes: 1100 }
];

// [GET] Listar todos - Requisito: Read [cite: 5, 10]
app.get('/animes', (req, res) => {
    res.status(200).json(animes);
});

// [POST] Criar novo - Requisito: Create [cite: 5, 10]
app.post('/animes', (req, res) => {
    const { title, genre, episodes } = req.body;
    if (!title || !genre) {
        return res.status(400).json({ message: "Título e gênero são obrigatórios." });
    }
    const newAnime = { id: Date.now(), title, genre, episodes: episodes || 0 };
    animes.push(newAnime);
    res.status(201).json(newAnime); // Status 201: Created [cite: 11, 22]
});

// [PUT] Atualizar - Requisito: Update [cite: 5, 10]
app.put('/animes/:id', (req, res) => {
    const { id } = req.params;
    const { title, genre, episodes } = req.body;
    const index = animes.findIndex(a => a.id == id);

    if (index === -1) return res.status(404).json({ message: "Anime não encontrado." });

    animes[index] = { ...animes[index], title, genre, episodes };
    res.status(200).json(animes[index]);
});

// [DELETE] Remover - Requisito: Delete [cite: 5, 10]
app.delete('/animes/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = animes.length;
    animes = animes.filter(a => a.id != id);

    if (animes.length === initialLength) {
        return res.status(404).json({ message: "Anime não encontrado." });
    }
    res.status(204).send(); // Status 204: No Content 
});

app.listen(PORT, () => {
    console.log(`🚀 API rodando em http://localhost:${PORT}`);
});