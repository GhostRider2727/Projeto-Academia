import { useState } from 'react';

function Inscricao(props) {
  const [mensagem, setMensagem] = useState(props.conteudo || 'Estado inicial');
  const [aluno, setAluno] = useState({
    nome: '',
    email: '',
    telefone: ''
  });
  const [status, setStatus] = useState('typing'); // typing, submitting, success, error

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAluno(prevAluno => ({
      ...prevAluno,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setMensagem('Enviando dados...');
    
    try {
      // Simulando uma chamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aqui viria a lógica real de cadastro
      console.log('Dados do aluno:', aluno);
      
      setStatus('success');
      setMensagem('Aluno cadastrado com sucesso!');
      
      // Limpar formulário após sucesso
      setAluno({
        nome: '',
        email: '',
        telefone: ''
      });
      
    } catch (error) {
      setStatus('error');
      setMensagem('Erro ao cadastrar aluno. Tente novamente.');
    }
  };

  const handleReset = () => {
    setMensagem(props.conteudo || 'Estado inicial');
    setAluno({
      nome: '',
      email: '',
      telefone: ''
    });
    setStatus('typing');
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      margin: '10px 0'
    }}>
      <h3>Formulário de Inscrição</h3>
      
      <p style={{ 
        padding: '10px', 
        backgroundColor: status === 'success' ? '#d4edda' : 
                        status === 'error' ? '#f8d7da' : '#e2e3e5',
        borderRadius: '4px',
        color: status === 'success' ? '#155724' : 
               status === 'error' ? '#721c24' : '#383d41'
      }}>
        {mensagem}
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Nome completo:
          </label>
          <input
            type="text"
            name="nome"
            value={aluno.nome}
            onChange={handleInputChange}
            disabled={status === 'submitting'}
            style={{ 
              width: '100%', 
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={aluno.email}
            onChange={handleInputChange}
            disabled={status === 'submitting'}
            style={{ 
              width: '100%', 
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Telefone:
          </label>
          <input
            type="tel"
            name="telefone"
            value={aluno.telefone}
            onChange={handleInputChange}
            disabled={status === 'submitting'}
            style={{ 
              width: '100%', 
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit"
            disabled={status === 'submitting'}
            style={{
              padding: '10px 20px',
              backgroundColor: status === 'submitting' ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: status === 'submitting' ? 'not-allowed' : 'pointer'
            }}
          >
            {status === 'submitting' ? 'Cadastrando...' : 'Cadastrar Aluno'}
          </button>
          
          <button 
            type="button"
            onClick={handleReset}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Limpar
          </button>
        </div>
      </form>

      {/* Debug: Mostrando o estado atual */}
      <div style={{ 
        marginTop: '20px', 
        padding: '10px', 
        backgroundColor: '#f8f9fa',
        borderRadius: '4px',
        fontSize: '12px'
      }}>
        <strong>Estado atual:</strong> {status}
        <br />
        <strong>Dados do aluno:</strong> {JSON.stringify(aluno)}
      </div>
    </div>
  );
}

export default Inscricao;