const telas = ["telaInicial", "telaCadastro", "telaCadastroSucesso", "telaLogin", "telaEventos", "telaDetalhe", "telaInscricao", "telaSucesso"];
let eventos = [];
let eventoSelecionado = null;
let usuarioAtual = null;

function mostrarTela(id) {
  telas.forEach(tela => {
    const el = document.getElementById(tela);
    if (el) el.classList.toggle("hidden", tela !== id);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function atualizarCabecalho() {
  const logado = Boolean(usuarioAtual);
  document.getElementById("btnEntrar").classList.toggle("hidden", logado);
  document.getElementById("btnSair").classList.toggle("hidden", !logado);
  const greeting = document.getElementById("usuarioLogado");
  greeting.classList.toggle("hidden", !logado);
  greeting.textContent = logado ? `Olá, ${usuarioAtual.nome}` : "";
}

async function apiFetch(url, options = {}) {
  const response = await fetch(url, {
    credentials: "same-origin",
    ...options,
    headers: { ...(options.headers || {}) }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.mensagem || "Não foi possível concluir a solicitação.");
    error.status = response.status;
    throw error;
  }
  return data;
}

async function verificarSessao() {
  try {
    usuarioAtual = await apiFetch("/api/auth/me");
    atualizarCabecalho();
    mostrarTela("telaEventos");
    await carregarEventos();
  } catch {
    usuarioAtual = null;
    atualizarCabecalho();
    mostrarTela("telaInicial");
  }
}

async function cadastrarUsuario(event) {
  event.preventDefault();
  const erro = document.getElementById("erroCadastro");
  erro.textContent = "";
  const nome = document.getElementById("cadNome").value.trim();
  const email = document.getElementById("cadEmail").value.trim();
  const senha = document.getElementById("cadSenha").value;
  const confirmarSenha = document.getElementById("cadConfirmarSenha").value;

  if (!nome || !email || !senha || !confirmarSenha) {
    erro.textContent = "Preencha todos os campos.";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    erro.textContent = "Informe um e-mail válido.";
    return;
  }
  if (senha.length < 6) {
    erro.textContent = "A senha deve ter pelo menos 6 caracteres.";
    return;
  }
  if (senha !== confirmarSenha) {
    erro.textContent = "A senha e a confirmação não são iguais.";
    return;
  }

  const botao = document.querySelector('#formCadastro button[type="submit"]');
  botao.disabled = true;
  botao.textContent = "Cadastrando...";
  try {
    await apiFetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha, confirmarSenha })
    });
    document.getElementById("formCadastro").reset();
    mostrarTela("telaCadastroSucesso");
  } catch (e) {
    erro.textContent = e.message;
    // Cadastro inválido: informa o erro e retorna à tela inicial após breve pausa.
    if (e.status === 400 || e.status === 409) {
      setTimeout(() => {
        if (!document.getElementById("telaCadastro").classList.contains("hidden")) {
          document.getElementById("formCadastro").reset();
          mostrarTela("telaInicial");
        }
      }, 2200);
    }
  } finally {
    botao.disabled = false;
    botao.textContent = "Cadastrar";
  }
}

async function entrarUsuario(event) {
  event.preventDefault();
  const erro = document.getElementById("erroLogin");
  erro.textContent = "";
  const email = document.getElementById("loginEmail").value.trim();
  const senha = document.getElementById("loginSenha").value;
  if (!email || !senha) {
    erro.textContent = "Informe seu e-mail e sua senha.";
    return;
  }
  const botao = document.querySelector('#formLogin button[type="submit"]');
  botao.disabled = true;
  botao.textContent = "Entrando...";
  try {
    const dados = await apiFetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });
    usuarioAtual = { nome: dados.nome, email };
    atualizarCabecalho();
    document.getElementById("formLogin").reset();
    mostrarTela("telaEventos");
    await carregarEventos();
  } catch (e) {
    erro.textContent = e.message;
  } finally {
    botao.disabled = false;
    botao.textContent = "Entrar";
  }
}

async function sairUsuario() {
  try { await apiFetch("/api/auth/logout", { method: "POST" }); } catch {}
  usuarioAtual = null;
  eventos = [];
  atualizarCabecalho();
  mostrarTela("telaInicial");
}

async function carregarEventos() {
  const lista = document.getElementById("listaEventos");
  lista.innerHTML = '<p class="muted">Carregando eventos...</p>';
  try {
    eventos = await apiFetch("/api/eventos");
    renderizarEventos();
  } catch (erro) {
    lista.innerHTML = "";
    document.getElementById("mensagemEventos").textContent =
      erro.status === 401 ? "Entre na sua conta para consultar os eventos." :
      "Não foi possível carregar os eventos. Confira se o servidor está em execução.";
    if (erro.status === 401) mostrarTela("telaLogin");
  }
}

function renderizarEventos() {
  const termo = document.getElementById("buscaEvento").value.trim().toLocaleLowerCase("pt-BR");
  const categoria = document.getElementById("filtroCategoria").value;
  const filtrados = eventos.filter(evento =>
    evento.nome.toLocaleLowerCase("pt-BR").includes(termo) &&
    (!categoria || evento.categoria === categoria)
  );
  const lista = document.getElementById("listaEventos");
  lista.innerHTML = "";
  document.getElementById("mensagemEventos").textContent = "";

  if (!filtrados.length) {
    lista.innerHTML = '<p class="muted">Nenhum evento encontrado com esses filtros.</p>';
    return;
  }

  filtrados.forEach(evento => {
    const card = document.createElement("article");
    card.className = "event-card";
    const placeholder = document.createElement("div");
    placeholder.className = "event-placeholder";
    placeholder.setAttribute("aria-hidden", "true");

    const info = document.createElement("div");
    info.className = "event-info";
    const nome = document.createElement("h2");
    nome.textContent = evento.nome;
    const data = document.createElement("p");
    data.textContent = "▦  " + evento.data;
    const local = document.createElement("p");
    local.textContent = "⌖  " + evento.local;
    info.append(nome, data, local);

    const botao = document.createElement("button");
    botao.className = "btn btn-dark";
    botao.textContent = "Ver detalhes";
    botao.addEventListener("click", () => abrirDetalhes(evento.id));
    card.append(placeholder, info, botao);
    lista.append(card);
  });
}

async function abrirDetalhes(id) {
  try {
    eventoSelecionado = await apiFetch(`/api/eventos/${id}`);
    document.getElementById("detalheCategoria").textContent = eventoSelecionado.categoria.toUpperCase();
    document.getElementById("detalheNome").textContent = eventoSelecionado.nome;
    document.getElementById("detalheDescricao").textContent = eventoSelecionado.descricao;
    document.getElementById("detalheData").textContent = eventoSelecionado.data;
    document.getElementById("detalheLocal").textContent = eventoSelecionado.local;
    mostrarTela("telaDetalhe");
  } catch (erro) {
    alert(erro.message);
    if (erro.status === 401) mostrarTela("telaLogin");
  }
}

function abrirInscricao() {
  if (!eventoSelecionado) return;
  document.getElementById("eventoId").value = eventoSelecionado.id;
  document.getElementById("nomeEventoInscricao").textContent = eventoSelecionado.nome;
  document.getElementById("erroInscricao").textContent = "";
  document.getElementById("formInscricao").reset();
  mostrarTela("telaInscricao");
}

async function enviarInscricao(event) {
  event.preventDefault();
  const erro = document.getElementById("erroInscricao");
  erro.textContent = "";
  const payload = {
    eventoId: Number(document.getElementById("eventoId").value),
    nome: document.getElementById("nome").value.trim(),
    email: document.getElementById("email").value.trim(),
    curso: document.getElementById("curso").value,
    turno: document.getElementById("turno").value,
    aceitouTermos: document.getElementById("aceitouTermos").checked
  };
  if (!payload.nome || !payload.email || !payload.curso || !payload.turno) {
    erro.textContent = "Preencha todos os campos antes de confirmar."; return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    erro.textContent = "Informe um endereço de e-mail válido."; return;
  }
  if (!payload.aceitouTermos) {
    erro.textContent = "Você precisa aceitar os termos e condições."; return;
  }

  const botao = document.querySelector('#formInscricao button[type="submit"]');
  botao.disabled = true;
  botao.textContent = "Enviando...";
  try {
    const dados = await apiFetch("/api/inscricoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    document.getElementById("mensagemSucesso").textContent =
      `Sua inscrição em "${dados.eventoNome}" foi confirmada para ${dados.email}.`;
    mostrarTela("telaSucesso");
  } catch (e) {
    erro.textContent = e.message;
    if (e.status === 401) mostrarTela("telaLogin");
  } finally {
    botao.disabled = false;
    botao.textContent = "Confirmar inscrição";
  }
}

document.getElementById("btnIrLogin").addEventListener("click", () => mostrarTela("telaLogin"));
document.getElementById("btnIrCadastro").addEventListener("click", () => mostrarTela("telaCadastro"));
document.getElementById("btnEntrar").addEventListener("click", () => mostrarTela("telaLogin"));
document.getElementById("btnSair").addEventListener("click", sairUsuario);
document.getElementById("voltarInicialCadastro").addEventListener("click", () => mostrarTela("telaInicial"));
document.getElementById("voltarInicialLogin").addEventListener("click", () => mostrarTela("telaInicial"));
document.getElementById("linkLoginCadastro").addEventListener("click", e => { e.preventDefault(); mostrarTela("telaLogin"); });
document.getElementById("linkCadastroLogin").addEventListener("click", e => { e.preventDefault(); mostrarTela("telaCadastro"); });
document.getElementById("btnSucessoLogin").addEventListener("click", () => mostrarTela("telaLogin"));
document.getElementById("buscaEvento").addEventListener("input", renderizarEventos);
document.getElementById("filtroCategoria").addEventListener("change", renderizarEventos);
document.getElementById("btnInscrever").addEventListener("click", abrirInscricao);
document.getElementById("formCadastro").addEventListener("submit", cadastrarUsuario);
document.getElementById("formLogin").addEventListener("submit", entrarUsuario);
document.getElementById("formInscricao").addEventListener("submit", enviarInscricao);
document.getElementById("voltarEventos").addEventListener("click", () => mostrarTela("telaEventos"));
document.getElementById("voltarDetalhe").addEventListener("click", () => mostrarTela("telaDetalhe"));
document.getElementById("voltarLista").addEventListener("click", () => mostrarTela("telaEventos"));
document.getElementById("logoInicio").addEventListener("click", e => { e.preventDefault(); mostrarTela(usuarioAtual ? "telaEventos" : "telaInicial"); });
document.getElementById("navEventos").addEventListener("click", e => { e.preventDefault(); if (usuarioAtual) mostrarTela("telaEventos"); else mostrarTela("telaLogin"); });

verificarSessao();
