import { useState, useEffect } from 'react';

function ListaAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [alunoEditando, setAlunoEditando] = useState(null);

  // Simulando carregamento de dados
  useEffect(() => {
    const carregarAlunos = async () => {
      try {
        setCarregando(true);
        // Simulando API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Dados mock
        const dadosMock = [
          { id: 1, nome: 'João Silva', email: 'joao@email.com', telefone: '(11) 99999-9999' },
          { id: 2, nome: 'Maria Santos', email: 'maria@email.com', telefone: '(11) 98888-8888' },
          { id: 3, nome: 'Pedro Oliveira', email: 'pedro@email.com', telefone: '(11) 97777-7777' }
        ];
        
        setAlunos(dadosMock);
      } catch (error) {
        console.error('Erro ao carregar alunos:', error);
      } finally {
        setCarregando(false);
      }
    };

    carregarAlunos();
  }, []);

  const alunosFiltrados = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    aluno.email.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleEditar = (aluno) => {
    setAlunoEditando(aluno);
  };

  const handleSalvarEdicao = () => {
    if (alunoEditando) {
      setAlunos(prevAlunos =>
        prevAlunos.map(aluno =>
          aluno.id === alunoEditando.id ? alunoEditando : aluno
        )
      );
      setAlunoEditando(null);
    }
  };

  const handleExcluir = (id) => {
    setAlunos(prevAlunos => prevAlunos.filter(aluno => aluno.id !== id));
  };

  if (carregando) {
    return <div>Carregando alunos...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h3>Lista de Alunos</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar aluno..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <span>
          Total: {alunos.length} aluno(s) | 
          Mostrando: {alunosFiltrados.length} aluno(s)
        </span>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nome</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Telefone</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunosFiltrados.map(aluno => (
            <tr key={aluno.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{aluno.id}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {alunoEditando?.id === aluno.id ? (
                  <input
                    value={alunoEditando.nome}
                    onChange={(e) => setAlunoEditando({
                      ...alunoEditando,
                      nome: e.target.value
                    })}
                  />
                ) : (
                  aluno.nome
                )}
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {alunoEditando?.id === aluno.id ? (
                  <input
                    value={alunoEditando.email}
                    onChange={(e) => setAlunoEditando({
                      ...alunoEditando,
                      email: e.target.value
                    })}
                  />
                ) : (
                  aluno.email
                )}
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {alunoEditando?.id === aluno.id ? (
                  <input
                    value={alunoEditando.telefone}
                    onChange={(e) => setAlunoEditando({
                      ...alunoEditando,
                      telefone: e.target.value
                    })}
                  />
                ) : (
                  aluno.telefone
                )}
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {alunoEditando?.id === aluno.id ? (
                  <button onClick={handleSalvarEdicao}>Salvar</button>
                ) : (
                  <>
                    <button 
                      onClick={() => handleEditar(aluno)}
                      style={{ marginRight: '5px' }}
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleExcluir(aluno.id)}
                      style={{ backgroundColor: '#dc3545', color: 'white' }}
                    >
                      Excluir
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {alunosFiltrados.length === 0 && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Nenhum aluno encontrado
        </div>
      )}
    </div>
  );
}

export default ListaAlunos;