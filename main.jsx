import React from 'react';
import ReactDOM from 'react-dom/client';
import Inscricao from './components/Inscricao';
import ListaAlunos from './components/ListaAlunos';
import './index.css';

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Sistema de Academia - Gerenciamento de Estado</h1>
      
      <section style={{ marginBottom: '40px' }}>
        <h2>Cadastro de Alunos</h2>
        <Inscricao conteudo="Preencha os dados para cadastrar um novo aluno" />
      </section>

      <section>
        <h2>Alunos Cadastrados</h2>
        <ListaAlunos />
      </section>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);