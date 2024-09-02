import React, { useState, useEffect } from "react";
import './s.css';

const PutUser = () => {

  const urlPadrao ="http://localhost:3000"
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
      const res = await fetch(`http://localhost:3000/pessoas/${newid}`);
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

  const putPessoas = async (e) => {
    e.preventDefault();

    const updatedPessoa = {
      Nome: nome,
      Apelido: apelido,
      Nascimento: nascimento,
      Stack: Array.isArray(stack) ? stack : stack.split(",").map((item) => item.trim())
    };

    try {
      const res = await fetch(`http://localhost:3000/pessoas/${newid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPessoa),
      });

      if (!res.ok) throw new Error(`Erro ao atualizar: ${res.statusText}`);

      setMessage("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar pessoa:", error);
      setMessage("Erro ao atualizar o usuário.");
    }
  };

  return (
    <div className="putuser-container">
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
          <form onSubmit={putPessoas}>
            <label>Nome:
              <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} />
            </label>
            <label>Apelido:
              <input type='text' value={apelido} onChange={(e) => setApelido(e.target.value)} />
            </label>
            <label>Nascimento:
              <input type='text' value={nascimento} placeholder="AAAA-MM-DD" onChange={(e) => setNascimento(e.target.value)} />
            </label>
            <label>Stack:
              <input type='text' value={stack.join(", ")} onChange={(e) => setStack(e.target.value.split(",").map((s) => s.trim()))} />
            </label>
            <input type='submit' className="btn-submit" value="Atualizar" />
          </form>
        </div>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default PutUser;