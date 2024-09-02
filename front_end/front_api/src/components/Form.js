import React, { useState } from "react";
import './Form.css';


const urlPadrao="http://localhost:3000"

const Form = () => {
  const [Nome, setNome] = useState("");
  const [Apelido, setApelido] = useState("");
  const [Nascimento, setNascimento] = useState("");
  const [AuxStack, setAuxStack] = useState("");
  const [Stack, setStack] = useState([]);

  const addUser = async (e) => {
    e.preventDefault();

    const newUser = {
      Nome,
      Apelido,
      Nascimento,
      Stack
    };

    try {
      const res = await fetch(`${urlPadrao}/pessoas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });

      if (!res.ok) {
        throw new Error('Erro ao enviar os dados');
      }

      const data = await res.json();
      console.log('Usuário adicionado:', data);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const addStack = () => {
    if (AuxStack.trim() !== "") {
      setStack((prevStack) => [...prevStack, AuxStack]); // Atualização correta do estado
      setAuxStack(""); // Limpa o campo AuxStack para novas entradas
    } else {
      alert("O campo Stack não pode estar vazio.");
    }
    console.log(Stack)
   
  };

  return (
    <div>
      <form onSubmit={addUser}>
        <label>Nome:
          <input type='text' value={Nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <label>Apelido:
          <input type='text' value={Apelido} onChange={(e) => setApelido(e.target.value)} />
        </label>
        <label>Nascimento:
          <input type='text' value={Nascimento} placeholder="AAAA-MM-DD" onChange={(e) => setNascimento(e.target.value)} />
        </label>
        <label>Stack:
          <input type='text' value={AuxStack} onChange={(e) => setAuxStack(e.target.value)} />
          <input type='button' value="Adicionar Stack" onClick={addStack} />
        </label>
        <input type='submit' value="Enviar" />
      </form>
    </div>
  );
};

export default Form;