import React, { useState, useEffect } from "react";
import './s.css';

const SelectId = () => {
  
  const urlPadrao ="http://localhost:3000"
  const [pessoas, setPessoas] = useState([]);
  const [newid, setNewId] = useState("");
  const [pessoaById, setPessoaById] = useState(null);
  const [nome, setNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [stack, setStack] = useState([]);

  useEffect(() => {
    async function fetchPessoas() {
      try {
        const res = await fetch(`${urlPadrao}/pessoasAll`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setPessoas(data);
      } catch (error) {
        console.error("Erro ao buscar pessoas:", error);
      }
    }
    fetchPessoas();
  }, []);

  const fetchPessoaById = async () => {
    if (!newid) return;

    try {
      const res = await fetch(`http://localhost:3000/pessoas/${newid}`);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const dataPessoa = await res.json();
      setPessoaById(dataPessoa);
      
      // Supondo que a resposta seja um objeto com as propriedades Nome, Apelido, Nascimento e Stack
      setNome(dataPessoa.Nome);
      setApelido(dataPessoa.Apelido);
      setNascimento(dataPessoa.Nascimento);
      if(dataPessoa.Stack != null)
      {
        setStack(dataPessoa.Stack);
      }
    } catch (error) {
      console.error("Erro ao buscar pessoa por ID:", error);
    }
  };

  return (
    <div>
      <label>
        Escolha um ID:
        <select name="PessoasId" onChange={(e) => setNewId(e.target.value)}>
          <option value="">Selecione um ID</option>
          {pessoas.map((pessoa) => (
            <option key={pessoa.id} value={pessoa.id}>
              {pessoa.id} - {pessoa.Apelido}
            </option>
          ))}
        </select>
      </label>
      <input type="button" value="Buscar usuário" onClick={fetchPessoaById} />

      {pessoaById && (
        <div>
          <p>Nome: {nome}</p>
          <p>Apelido: {apelido}</p>
          <p>Nascimento: {nascimento}</p>
          <p>Stack: {stack.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default SelectId;