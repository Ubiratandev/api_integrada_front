import React, { useState } from 'react';
import './s.css';

const SelectT = () => {
  const [pessoas, setPessoas] = useState([]);
  const [termo, settermo] = useState("");
  const [pessoaByT, setPessoaByT] = useState([]);
  const [nome, setNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [stack, setStack] = useState([]);
  const urlPadrao="http://localhost:3000"

  const fetchPessoaByT = async () => {
    try {
      const res = await fetch(`${urlPadrao}/pessoas?t=${termo}`);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const dataPessoa = await res.json();

      setPessoaByT(dataPessoa);
      
      // Atualiza os estados com as informações da pessoa
      if (dataPessoa.length > 0) {
        const { Nome, Apelido, Nascimento, Stack } = dataPessoa[0];
        setNome(Nome);
        setApelido(Apelido);
        setNascimento(Nascimento);
        setStack(Stack || []);
      }
    } catch (error) {
      console.error("Erro ao buscar pessoa por termo", error);
    }
  };

  // Função para voltar ao topo da página
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="select-t-container">
      <label className="label-termo">
        Digite um termo para busca:
        <input 
          type="text" 
          className="input-termo" 
          onChange={(e) => settermo(e.target.value)} 
        />
      </label>
      <input 
        type="button" 
        className="btn-buscar" 
        value="Buscar usuário" 
        onClick={fetchPessoaByT} 
      />

      <ul className="result-list">
        {pessoaByT.map((pessoa) => (
          <li key={pessoa.id} className="result-item">
            <p>Nome: {pessoa.Nome}</p>
            <p>Apelido: {pessoa.Apelido}</p>
            <p>Nascimento: {pessoa.Nascimento}</p>
            <p>Stack: {pessoa.Stack?.join(', ')}</p>
          </li>
        ))}
      </ul>

    
    </div>
  );
};

export default SelectT;