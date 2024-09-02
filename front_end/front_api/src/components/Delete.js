import React, { useState, useEffect } from "react";
import './s.css';

const Delete = () => {
  const urlPadrao = "http://localhost:3000"
  const [pessoas, setPessoas] = useState([]);
  const [newid, setNewId] = useState("");
  const [pessoaById, setPessoaById] = useState(null);
  const [nome, setNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [stack, setStack] = useState([]);
  const [message, setMessage] = useState("");

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
      const res = await fetch(`${urlPadrao}/pessoas/${newid}`);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const dataPessoa = await res.json();
      setPessoaById(dataPessoa);
      setNome(dataPessoa.Nome);
      setApelido(dataPessoa.Apelido);
      setNascimento(dataPessoa.Nascimento);
      setStack(dataPessoa.Stack || []);
    } catch (error) {
      console.error("Erro ao buscar pessoa por ID:", error);
    }
  };

  const deletePessoas = async () => {
    if (!newid) return;

    try {
      const res = await fetch(`${urlPadrao}/pessoas/${newid}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Erro ao deletar: ${res.statusText}`);
      }

      setMessage("Usuário deletado com sucesso!");
      setPessoas(pessoas.filter((pessoa) => pessoa.id !== newid));
      setPessoaById(null); // Limpa o estado após deleção
    } catch (error) {
      console.error("Erro ao deletar pessoa:", error);
      setMessage("Erro ao deletar o usuário.");
    }
  };

  return (
    <div className="delete-container">
      <label className="label-select">
        Escolha um ID:
        <select className="select-id" name="PessoasId" onChange={(e) => setNewId(e.target.value)}>
          <option value="">Selecione um ID</option>
          {pessoas.map((pessoa) => (
            <option key={pessoa.id} value={pessoa.id}>
              {pessoa.id} - {pessoa.Apelido}
            </option>
          ))}
        </select>
      </label>
      <input type="button" className="btn-buscar" value="Buscar usuário" onClick={fetchPessoaById} />

      {pessoaById && (
        <div className="pessoa-info">
          <p>Nome: {nome}</p>
          <p>Apelido: {apelido}</p>
          <p>Nascimento: {nascimento}</p>
          <p>Stack: {stack.join(", ")}</p>
          <input type="button" className="btn-delete" value="Deletar usuário" onClick={deletePessoas} />
        </div>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Delete;