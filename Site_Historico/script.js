const biblioteca = document.getElementById("biblioteca");
const search = document.getElementById("search");
const conteudoLivro = document.getElementById("conteudoLivro");

const modal = document.getElementById("modal");
const modalTitulo = document.getElementById("modalTitulo");
const modalTexto = document.getElementById("modalTexto");
const fecharModal = document.getElementById("fecharModal");

const params = new URLSearchParams(window.location.search);
const idLivro = params.get("id");

// ---------- Renderizar biblioteca ----------
function renderLivros(lista) {
  if (!biblioteca) return;
  biblioteca.innerHTML = "";

  lista.forEach(livro => {
    const card = document.createElement("div");
    card.className = "livro";
    card.innerHTML = `
      <img src="${livro.capa}" alt="${livro.titulo}">
      <h3>${livro.titulo}</h3>
    `;
    card.addEventListener("click", () => {
      window.location.href = `livro.html?id=${livro.id}`;
    });
    biblioteca.appendChild(card);
  });
}

// ---------- Busca ----------
if (search) {
  search.addEventListener("input", e => {
    const termo = e.target.value.toLowerCase();
    const filtrados = livros.filter(l =>
      l.titulo.toLowerCase().includes(termo)
    );
    renderLivros(filtrados);
  });
}

// ---------- Página do livro ----------
if (conteudoLivro && idLivro) {
  const livro = livros.find(l => l.id == idLivro);
  if (livro) {
    conteudoLivro.innerHTML = livro.conteudo;
    ativarTermos();
  } else {
    conteudoLivro.innerHTML = "<h2>Livro não encontrado</h2>";
  }
}

// ---------- Modal ----------
function ativarTermos() {
  const termos = document.querySelectorAll(".termo");
  termos.forEach(termo => {
    termo.addEventListener("click", () => {
      modalTitulo.innerText = termo.dataset.titulo || "Definição";
      modalTexto.innerText = termo.dataset.texto || "Sem conteúdo.";
      modal.style.display = "block";
    });
  });
}

if (fecharModal) {
  fecharModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

if (modal) {
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });
}

// ---------- Inicialização ----------
if (biblioteca) renderLivros(livros);
