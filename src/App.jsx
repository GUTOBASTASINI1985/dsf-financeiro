import React, { useState } from "react";

export default function App() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [logado, setLogado] = useState(false);
  const [entradas, setEntradas] = useState([]);
  const [saidas, setSaidas] = useState([]);
  const [form, setForm] = useState({
    tipo: "entrada",
    valor: "",
    descricao: "",
    categoria: "",
  });

  const categorias = ["Alimentação", "Transporte", "Contas", "Lazer", "Outros"];

  const saldo =
    entradas.reduce((acc, e) => acc + e.valor, 0) -
    saidas.reduce((acc, s) => acc + s.valor, 0);

  const handleLogin = () => {
    if (usuario && senha) setLogado(true);
  };

  const adicionarMovimentacao = () => {
    const valor = parseFloat(form.valor);
    if (!valor || isNaN(valor)) return;

    if (form.tipo === "entrada") {
      setEntradas([...entradas, { valor, descricao: form.descricao }]);
    } else {
      setSaidas([
        ...saidas,
        { valor, descricao: form.descricao, categoria: form.categoria },
      ]);
    }

    setForm({ tipo: "entrada", valor: "", descricao: "", categoria: "" });
  };

  if (!logado) {
    return (
      <div style={{ padding: 20 }}>
        <h2>DSF - Login</h2>
        <input
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <br />
        <input
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <br />
        <button onClick={handleLogin}>Entrar</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Desafia o seu financeiro - DSF</h1>
      <h2>Saldo: R${saldo.toFixed(2)}</h2>

      <div>
        <select
          value={form.tipo}
          onChange={(e) => setForm({ ...form, tipo: e.target.value })}
        >
          <option value="entrada">Receita</option>
          <option value="saida">Despesa</option>
        </select>
        <input
          placeholder="Descrição"
          value={form.descricao}
          onChange={(e) => setForm({ ...form, descricao: e.target.value })}
        />
        <input
          placeholder="Valor"
          type="number"
          value={form.valor}
          onChange={(e) => setForm({ ...form, valor: e.target.value })}
        />
        {form.tipo === "saida" && (
          <select
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
          >
            {categorias.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        )}
        <button onClick={adicionarMovimentacao}>Adicionar</button>
      </div>

      <h3>Entradas</h3>
      <ul>
        {entradas.map((e, i) => (
          <li key={i}>
            {e.descricao}: R${e.valor.toFixed(2)}
          </li>
        ))}
      </ul>

      <h3>Despesas</h3>
      <ul>
        {saidas.map((s, i) => (
          <li key={i}>
            {s.descricao} ({s.categoria}): R${s.valor.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
