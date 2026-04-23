const biblioteca = JSON.parse(localStorage.getItem('gs_library') || '[]');
const carrinho = JSON.parse(localStorage.getItem('gs_cart') || '[]');

const gradeBiblioteca = document.getElementById('libGrid');
const elementoBibliotecaVazia = document.getElementById('libEmpty');
const elementoContagemCarrinho = document.getElementById('cartCount');
const botaoSair = document.getElementById('logoutBtn');

elementoContagemCarrinho.textContent = carrinho.length;
elementoContagemCarrinho.style.display = carrinho.length > 0 ? 'flex' : 'none';

function criarSvgCard(cores) {
  const [cor1, cor2] = cores;
  const idAleatorio = Math.random().toString(36).slice(2, 8);
  return `<svg class="card-gradient" viewBox="0 0 300 170" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="rg${idAleatorio}" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stop-color="${cor1}"/>
        <stop offset="100%" stop-color="${cor2}"/>
      </radialGradient>
    </defs>
    <rect width="300" height="170" fill="url(#rg${idAleatorio})"/>
    <ellipse cx="200" cy="80" rx="120" ry="90" fill="${cor1}" fill-opacity="0.4"/>
    <ellipse cx="60" cy="130" rx="100" ry="60" fill="${cor2}" fill-opacity="0.3"/>
  </svg>`;
}

function renderizar() {
  if (biblioteca.length === 0) {
    gradeBiblioteca.style.display = 'none';
    elementoBibliotecaVazia.style.display = 'flex';
    return;
  }

  elementoBibliotecaVazia.style.display = 'none';
  gradeBiblioteca.style.display = 'grid';

  gradeBiblioteca.innerHTML = biblioteca.map(entrada => {
    const jogo = DADOS_JOGOS.find(j => j.id === entrada.id);
    if (!jogo) return '';
    const preco = jogo.preco === 0 ? 'Grátis' : `R$ ${jogo.preco.toFixed(2).replace('.', ',')}`;
    return `
    <article class="game-card lib-card">
      <div class="card-image">
        ${criarSvgCard(jogo.cores)}
        <span class="card-genre-badge">${jogo.genero.toUpperCase()}</span>
        <div class="card-title-overlay">
          <h3>${jogo.titulo}</h3>
          <div class="card-genre-label">${jogo.genero}</div>
        </div>
      </div>
      <div class="card-body">
        <div class="card-info">
          <h4>${jogo.titulo}</h4>
          <div class="card-meta">${jogo.desenvolvedor} • ${preco}</div>
        </div>
      </div>
      <div class="key-box">
        <div class="key-label">Chave de ativação</div>
        <div class="key-value">${entrada.chave}</div>
      </div>
    </article>`;
  }).join('');
}

botaoSair.addEventListener('click', () => {
  localStorage.removeItem('gs_user');
  window.location.href = 'index.html';
});

renderizar();