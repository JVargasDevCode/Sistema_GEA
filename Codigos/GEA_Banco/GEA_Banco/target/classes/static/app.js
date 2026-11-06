const telas = [
  "telaInicial",
  "telaCadastro",
  "telaCadastroSucesso",
  "telaLogin",
  "telaEventos",
  "telaComites",
  "telaAtleticas",
  "telaEditais",
  "telaIngressos",
  "telaContato",
  "telaMinhasInscricoes",
  "telaDetalhe",
  "telaInscricao",
  "telaSucesso"
];

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
  document.getElementById("accountMenu").classList.toggle("hidden", !logado);
  document.getElementById("navInscricoes").classList.toggle("hidden", !logado);

  const greeting = document.getElementById("usuarioLogado");
  greeting.classList.toggle("hidden", !logado);
  greeting.textContent = logado ? `Olá, ${usuarioAtual.nome}` : "";

  document.getElementById("btnAccountMenu").textContent = logado
      ? (usuarioAtual.nome || "B").trim().charAt(0).toLocaleUpperCase("pt-BR")
      : "B";

  fecharMenuConta();
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

function alternarMenuConta() {
  const dropdown = document.getElementById("accountDropdown");
  const botao = document.getElementById("btnAccountMenu");

  const abrir = dropdown.classList.contains("hidden");

  dropdown.classList.toggle("hidden", !abrir);
  botao.setAttribute("aria-expanded", String(abrir));
}

function fecharMenuConta() {
  const dropdown = document.getElementById("accountDropdown");
  const botao = document.getElementById("btnAccountMenu");

  if (dropdown) dropdown.classList.add("hidden");
  if (botao) botao.setAttribute("aria-expanded", "false");
}

function abrirInformacoesConta() {
  if (!usuarioAtual) return;

  document.getElementById("contaNome").textContent = usuarioAtual.nome || "—";
  document.getElementById("contaEmail").textContent = usuarioAtual.email || "—";

  fecharMenuConta();
  document.getElementById("modalConta").classList.remove("hidden");
}

function fecharInformacoesConta() {
  document.getElementById("modalConta").classList.add("hidden");
}

async function sairUsuario() {
  try {
    await apiFetch("/api/auth/logout", { method: "POST" });
  } catch {}

  usuarioAtual = null;
  eventos = [];

  fecharInformacoesConta();
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
        erro.status === 401
            ? "Entre na sua conta para consultar os eventos."
            : "Não foi possível carregar os eventos. Confira se o servidor está em execução.";

    if (erro.status === 401) mostrarTela("telaLogin");
  }
}

function normalizarCategoria(categoria) {
  const valor = (categoria || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  if (valor.includes("tecnologia")) return "tecnologia";
  if (valor.includes("social")) return "social";

  return "academico";
}

function criarImagemEvento(categoria, classeExtra = "") {
  const categoriaNormalizada = normalizarCategoria(categoria);

  const moldura = document.createElement("div");
  moldura.className = `event-placeholder event-placeholder-${categoriaNormalizada} ${classeExtra}`.trim();

  const imagem = document.createElement("img");
  imagem.src = `/images/evento-${categoriaNormalizada}.svg`;
  imagem.alt = `Ilustração de evento ${categoria || "acadêmico"}`;
  imagem.loading = "lazy";

  imagem.onerror = () => {
    imagem.remove();
    moldura.classList.add("image-fallback");

    moldura.textContent =
        categoriaNormalizada === "tecnologia"
            ? "💻"
            : categoriaNormalizada === "social"
                ? "🎭"
                : "🎓";
  };

  moldura.append(imagem);
  return moldura;
}

function renderizarEventos() {
  const termo = document.getElementById("buscaEvento").value
      .trim()
      .toLocaleLowerCase("pt-BR");

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

    const placeholder = criarImagemEvento(evento.categoria);

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

    document.getElementById("detalheCategoria").textContent =
        eventoSelecionado.categoria.toUpperCase();

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

  // Nome e e-mail pertencem à conta autenticada e não podem ser alterados na inscrição.
  document.getElementById("nome").value = usuarioAtual?.nome || "";
  document.getElementById("email").value = usuarioAtual?.email || "";

  document.getElementById("nome").readOnly = true;
  document.getElementById("email").readOnly = true;

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
    erro.textContent = "Preencha todos os campos antes de confirmar.";
    return;
  }

  if (
      !usuarioAtual ||
      payload.nome.trim().toLocaleLowerCase("pt-BR") !== usuarioAtual.nome.trim().toLocaleLowerCase("pt-BR") ||
      payload.email.trim().toLocaleLowerCase("pt-BR") !== usuarioAtual.email.trim().toLocaleLowerCase("pt-BR")
  ) {
    erro.textContent =
        "A inscrição deve usar o mesmo nome e e-mail cadastrados na sua conta. Não é permitido inscrever outra pessoa usando seu login.";
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    erro.textContent = "Informe um endereço de e-mail válido.";
    return;
  }

  if (!payload.aceitouTermos) {
    erro.textContent = "Você precisa aceitar os termos e condições.";
    return;
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

async function carregarMinhasInscricoes() {
  const lista = document.getElementById("listaMinhasInscricoes");
  const mensagem = document.getElementById("mensagemMinhasInscricoes");

  lista.innerHTML = '<p class="muted">Carregando suas inscrições...</p>';
  mensagem.textContent = "";

  try {
    const inscricoes = await apiFetch("/api/inscricoes");
    renderizarMinhasInscricoes(inscricoes);
  } catch (erro) {
    lista.innerHTML = "";

    mensagem.textContent = erro.status === 401
        ? "Entre na sua conta para consultar suas inscrições."
        : erro.message;

    if (erro.status === 401) mostrarTela("telaLogin");
  }
}

function renderizarMinhasInscricoes(inscricoes) {
  const lista = document.getElementById("listaMinhasInscricoes");
  const mensagem = document.getElementById("mensagemMinhasInscricoes");

  lista.innerHTML = "";
  mensagem.textContent = "";

  inscricoes = inscricoes.filter(inscricao => inscricao.ativa);

  if (!inscricoes.length) {
    lista.innerHTML = `
      <article class="empty-state">
        <h2>Você ainda não tem inscrições</h2>
        <p>Explore os eventos disponíveis e faça sua primeira inscrição.</p>
        <button class="btn btn-dark" id="btnExplorarEventos">Explorar eventos</button>
      </article>
    `;

    document.getElementById("btnExplorarEventos").addEventListener("click", () => {
      mostrarTela("telaEventos");
      carregarEventos();
    });

    return;
  }

  inscricoes.forEach(inscricao => {
    const card = document.createElement("article");
    card.className = "registration-card";

    const imagem = criarImagemEvento(
        inscricao.eventoCategoria || "Acadêmico",
        "registration-image"
    );

    const content = document.createElement("div");
    content.className = "registration-info";

    const title = document.createElement("h2");
    title.textContent = inscricao.eventoNome;

    const meta = document.createElement("p");
    meta.textContent = `Curso: ${inscricao.curso} · Turno: ${inscricao.turno}`;

    const date = document.createElement("p");
    date.textContent = inscricao.eventoData
        ? `Data: ${inscricao.eventoData}`
        : `Inscrição realizada em: ${formatarData(inscricao.criadaEm)}`;

    const status = document.createElement("span");
    status.className = "status-pill status-active";
    status.textContent = "Inscrição ativa";

    content.append(title, meta, date, status);

    const actions = document.createElement("div");
    actions.className = "registration-actions";

    const details = document.createElement("button");
    details.className = "btn btn-light";
    details.textContent = "Ver evento";
    details.addEventListener("click", () => abrirDetalhes(inscricao.eventoId));

    actions.append(details);

    if (inscricao.ativa) {
      const cancel = document.createElement("button");
      cancel.className = "btn btn-cancel";
      cancel.textContent = "Cancelar inscrição";
      cancel.addEventListener("click", () => cancelarInscricao(inscricao.id, cancel));

      actions.append(cancel);
    }

    card.append(imagem, content, actions);
    lista.append(card);
  });
}

function formatarData(valor) {
  if (!valor) return "—";

  const data = new Date(valor);

  return Number.isNaN(data.getTime())
      ? valor
      : data.toLocaleString("pt-BR");
}

async function cancelarInscricao(id, botao) {
  if (!confirm("Tem certeza de que deseja cancelar esta inscrição?")) return;

  botao.disabled = true;

  try {
    await apiFetch(`/api/inscricoes/${id}/cancelar`, {
      method: "PATCH"
    });

    await carregarMinhasInscricoes();
  } catch (erro) {
    alert(erro.message);
    botao.disabled = false;

    if (erro.status === 401) mostrarTela("telaLogin");
  }
}

/* Formulário de contato: validação e simulação */
function enviarMensagemContato(event) {
  event.preventDefault();

  const erro = document.getElementById("erroContato");
  const sucesso = document.getElementById("sucessoContato");

  erro.textContent = "";
  sucesso.textContent = "";

  const nome = document.getElementById("contatoNome").value.trim();
  const email = document.getElementById("contatoEmail").value.trim();
  const assunto = document.getElementById("contatoAssunto").value;
  const mensagem = document.getElementById("contatoMensagem").value.trim();

  if (!nome || !email || !assunto || !mensagem) {
    erro.textContent = "Preencha todos os campos antes de enviar.";
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    erro.textContent = "Informe um endereço de e-mail válido.";
    return;
  }

  document.getElementById("formContato").reset();

  sucesso.textContent =
      "Mensagem validada! Esta é uma simulação acadêmica: nenhum e-mail foi enviado.";
}

/* Eventos dos botões e navegação */
document.getElementById("btnIrLogin").addEventListener("click", () => mostrarTela("telaLogin"));
document.getElementById("btnIrCadastro").addEventListener("click", () => mostrarTela("telaCadastro"));
document.getElementById("btnEntrar").addEventListener("click", () => mostrarTela("telaLogin"));

document.getElementById("btnSair").addEventListener("click", sairUsuario);
document.getElementById("btnAccountMenu").addEventListener("click", alternarMenuConta);
document.getElementById("btnInformacoesConta").addEventListener("click", abrirInformacoesConta);

document.getElementById("fecharModalConta").addEventListener("click", fecharInformacoesConta);
document.getElementById("btnFecharConta").addEventListener("click", fecharInformacoesConta);

document.getElementById("modalConta").addEventListener("click", e => {
  if (e.target.id === "modalConta") fecharInformacoesConta();
});

document.addEventListener("click", e => {
  const menu = document.getElementById("accountMenu");

  if (menu && !menu.contains(e.target)) {
    fecharMenuConta();
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    fecharMenuConta();
    fecharInformacoesConta();
  }
});

document.getElementById("voltarInicialCadastro").addEventListener("click", () => mostrarTela("telaInicial"));
document.getElementById("voltarInicialLogin").addEventListener("click", () => mostrarTela("telaInicial"));

document.getElementById("linkLoginCadastro").addEventListener("click", e => {
  e.preventDefault();
  mostrarTela("telaLogin");
});

document.getElementById("linkCadastroLogin").addEventListener("click", e => {
  e.preventDefault();
  mostrarTela("telaCadastro");
});

document.getElementById("btnSucessoLogin").addEventListener("click", () => mostrarTela("telaLogin"));

document.getElementById("buscaEvento").addEventListener("input", renderizarEventos);
document.getElementById("filtroCategoria").addEventListener("change", renderizarEventos);

document.getElementById("btnInscrever").addEventListener("click", abrirInscricao);
document.getElementById("formCadastro").addEventListener("submit", cadastrarUsuario);
document.getElementById("formLogin").addEventListener("submit", entrarUsuario);
document.getElementById("formInscricao").addEventListener("submit", enviarInscricao);

document.getElementById("voltarEventos").addEventListener("click", () => mostrarTela("telaEventos"));
document.getElementById("voltarDetalhe").addEventListener("click", () => mostrarTela("telaDetalhe"));

document.getElementById("logoInicio").addEventListener("click", e => {
  e.preventDefault();
  mostrarTela(usuarioAtual ? "telaEventos" : "telaInicial");
});

document.getElementById("navEventos").addEventListener("click", e => {
  e.preventDefault();

  if (usuarioAtual) {
    mostrarTela("telaEventos");
    carregarEventos();
  } else {
    mostrarTela("telaLogin");
  }
});

document.getElementById("navComites").addEventListener("click", e => {
  e.preventDefault();
  mostrarTela("telaComites");
});

document.getElementById("navAtleticas").addEventListener("click", e => {
  e.preventDefault();
  mostrarTela("telaAtleticas");
});

document.getElementById("navEditais").addEventListener("click", e => {
  e.preventDefault();
  mostrarTela("telaEditais");
});

document.getElementById("navIngressos").addEventListener("click", e => {
  e.preventDefault();
  mostrarTela("telaIngressos");
});

document.getElementById("navContato").addEventListener("click", e => {
  e.preventDefault();
  mostrarTela("telaContato");
});

document.getElementById("btnIngressosEventos").addEventListener("click", () => {
  if (usuarioAtual) {
    mostrarTela("telaEventos");
    carregarEventos();
  } else {
    mostrarTela("telaLogin");
  }
});

document.getElementById("formContato").addEventListener("submit", enviarMensagemContato);

document.getElementById("btnConhecerEventos").addEventListener("click", () => {
  mostrarTela("telaEventos");
  carregarEventos();
});

async function abrirMinhasInscricoes() {
  if (!usuarioAtual) {
    mostrarTela("telaLogin");
    return;
  }

  mostrarTela("telaMinhasInscricoes");
  await carregarMinhasInscricoes();
}

document.getElementById("navInscricoes").addEventListener("click", e => {
  e.preventDefault();
  abrirMinhasInscricoes();
});

document.getElementById("voltarLista").addEventListener("click", () => {
  mostrarTela("telaEventos");
  carregarEventos();
});

verificarSessao();
