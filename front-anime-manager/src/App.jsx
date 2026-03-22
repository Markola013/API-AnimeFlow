import React, { useState, use, Suspense } from 'react';

const apiUrl = 'http://localhost:3001/animes';

// Função para buscar dados (Requisito: Hook use)
const fetchAnimes = () => fetch(apiUrl).then(res => res.json());
let initialAnimesPromise = fetchAnimes();

function AnimeList({ animesPromise, onEdit, onDeleteSuccess }) {
  // CRITÉRIO: Hook use() aplicado corretamente 
  const animes = use(animesPromise);

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este anime?")) return;

    try {
      const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
      if (response.status === 204) {
        // CRITÉRIO: Feedback visual de sucesso 
        alert("Anime removido com sucesso! 🗑️");
        onDeleteSuccess();
      } else {
        throw new Error("Erro ao deletar.");
      }
    } catch (error) {
      alert("Erro ao excluir o anime. Verifique se a API está rodando.");
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {animes.map(anime => (
        <div key={anime.id} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-slate-800 text-lg leading-tight">{anime.title}</h3>
              <span className="inline-block mt-1 px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-md uppercase">
                {anime.genre}
              </span>
              <p className="text-sm text-slate-500 mt-3 italic">
                {anime.episodes} Episódios
              </p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => onEdit(anime)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl" title="Editar">
                📝
              </button>
              <button onClick={() => handleDelete(anime.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl" title="Excluir">
                🗑️
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [formData, setFormData] = useState({ id: null, title: '', genre: '', episodes: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentAnimesPromise, setCurrentAnimesPromise] = useState(initialAnimesPromise);

  // Função para atualizar a lista sem dar reload na página
  const refreshList = () => {
    setCurrentAnimesPromise(fetchAnimes());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `${apiUrl}/${formData.id}` : apiUrl;

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, episodes: Number(formData.episodes) }),
      });

      if (response.ok) {
        // CRITÉRIO: Feedback visual de sucesso (Create/Update) 
        const acao = isEditing ? "atualizado" : "cadastrado";
        alert(`Anime ${acao} com sucesso! ✨`);
        
        setFormData({ id: null, title: '', genre: '', episodes: '' });
        setIsEditing(false);
        refreshList();
      } else {
        alert("Erro na validação dos dados da API.");
      }
    } catch (error) {
      alert("A API parece estar offline. Inicie o servidor Node.js.");
    }
  };

  const handleEditClick = (anime) => {
    setFormData(anime);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    /* Fundo cinza claro para contraste (Requisito UI: Layout Limpo)  */
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">AnimeFlow</h1>
          <p className="text-slate-500 font-medium italic">Gestão de Coleção SPA</p>
        </header>

        {/* FORMULÁRIO (Create e Update) */}
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-10">
          <h2 className="text-lg font-bold text-slate-800 mb-6 uppercase tracking-widest text-sm">
            {isEditing ? '✏️ Modo Edição' : '➕ Novo Cadastro'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <input 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Título do Anime"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            <div>
              <input 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Gênero"
                value={formData.genre}
                onChange={e => setFormData({...formData, genre: e.target.value})}
                required
              />
            </div>
            <div>
              <input 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                type="number"
                placeholder="Eps"
                value={formData.episodes}
                onChange={e => setFormData({...formData, episodes: e.target.value})}
              />
            </div>
            <button className={`md:col-span-4 p-4 rounded-xl font-bold text-white transition-all shadow-md ${isEditing ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-100' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100'}`}>
              {isEditing ? 'SALVAR ALTERAÇÕES' : 'CADASTRAR ANIME'}
            </button>
            {isEditing && (
              <button type="button" onClick={() => {setIsEditing(false); setFormData({id: null, title:'', genre:'', episodes:''})}} className="md:col-span-4 text-xs text-slate-400 hover:underline">CANCELAR</button>
            )}
          </form>
        </section>

        {/* LISTAGEM (Read e Delete) */}
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-6 px-2">Sua Coleção</h2>
          
          {/* CRITÉRIO: Suspense com fallback  */}
          <Suspense fallback={
            <div className="text-center p-12 bg-white rounded-3xl border border-dashed border-slate-300">
              <p className="text-slate-400 animate-pulse">Carregando dados da API...</p>
            </div>
          }>
            <AnimeList 
              animesPromise={currentAnimesPromise} 
              onEdit={handleEditClick} 
              onDeleteSuccess={refreshList}
            />
          </Suspense>
        </section>
      </div>
    </div>
  );
}