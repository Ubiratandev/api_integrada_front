import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import SelectId from './components/SelectId';
import SelectT from './components/SelectT';
import Delete from './components/Delete';
import PutUser from './components/PutUser';

function App() {
  // Estado para controlar o componente ativo
  const [activeComponent, setActiveComponent] = useState(null);

  // Função para renderizar o componente baseado no estado ativo
  const renderComponent = () => {
    switch (activeComponent) {
      case 'Form':
        return <Form />;
      case 'SelectId':
        return <SelectId />;
      case 'SelectT':
        return <SelectT />;
      case 'Delete':
        return <Delete />;
      case 'PutUser':
        return <PutUser />;
      default:
        return <p>Selecione um componente para exibir.</p>;
    }
  };

  return (
    <div className="App">
      <h1>Gerenciador de Pessoas</h1>
      <div className="button-container">
        <button onClick={() => setActiveComponent('Form')}>Cadastrar usuario</button>
        <button onClick={() => setActiveComponent('SelectId')}>Buscar usuarios por Id</button>
        <button onClick={() => setActiveComponent('SelectT')}>Busca por termo</button>
        <button onClick={() => setActiveComponent('Delete')}>Deletar usuarios</button>
        <button onClick={() => setActiveComponent('PutUser')}>Alterar usuarios</button>
      </div>

      <div className="component-container">
        {renderComponent()}
      </div>
    </div>
  );
}

export default App;