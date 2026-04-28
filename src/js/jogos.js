let generoAtivo = 'Todos';
let termoBusca = '';
let carrinho = JSON.parse(localStorage.getItem('gs_cart') || '[]');
let listaDesejos = JSON.parse(localStorage.getItem('gs_wishlist') || '[]');

const elementosFiltroGenero = document.getElementById('genreFilters');
const elementoGradeJogos = document.getElementById('gamesGrid');
const inputBusca = document.getElementById('searchInput');
const elementoContagemCarrinho = document.getElementById('cartCount');
const elementoInfoResultados = document.getElementById('resultsInfo');
const alertaToast = document.getElementById('toast');
const botaoSair = document.getElementById('logoutBtn');

function exibirAlerta(mensagem, tipo = '') {
  alertaToast.textContent = mensagem;
  alertaToast.className = `toast ${tipo}`;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => alertaToast.classList.add('show'));
  });
  setTimeout(() => alertaToast.classList.remove('show'), 2800);
}

function atualizarContagemCarrinho() {
  elementoContagemCarrinho.textContent = carrinho.length;
  elementoContagemCarrinho.style.display = carrinho.length > 0 ? 'flex' : 'none';
  localStorage.setItem('gs_cart', JSON.stringify(carrinho));
}

function alternarCarrinho(idJogo) {
  const indice = carrinho.indexOf(idJogo);
  if (indice === -1) {
    carrinho.push(idJogo);
    exibirAlerta('Adicionado ao carrinho!', 'success');
  } else {
    carrinho.splice(indice, 1);
    exibirAlerta('Removido do carrinho.');
  }
  atualizarContagemCarrinho();
  renderizarJogos();
}

function alternarListaDesejos(idJogo) {
  const indice = listaDesejos.indexOf(idJogo);
  if (indice === -1) {
    listaDesejos.push(idJogo);
    exibirAlerta('Adicionado à lista de desejos!', '');
  } else {
    listaDesejos.splice(indice, 1);
    exibirAlerta('Removido da lista de desejos.');
  }
  localStorage.setItem('gs_wishlist', JSON.stringify(listaDesejos));
  renderizarJogos();
}

function criarSvgCard(cores) {
  const [cor1, cor2] = cores;
  return `<svg class="card-gradient" viewBox="0 0 300 170" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="rg_${Math.random().toString(36).slice(2,6)}" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stop-color="${cor1}" stop-opacity="1"/>
        <stop offset="100%" stop-color="${cor2}" stop-opacity="1"/>
      </radialGradient>
    </defs>
    <rect width="300" height="170" fill="url(#rg_${Math.random().toString(36).slice(2,6)})"/>
    <ellipse cx="200" cy="80" rx="120" ry="90" fill="${cor1}" fill-opacity="0.4"/>
    <ellipse cx="60" cy="130" rx="100" ry="60" fill="${cor2}" fill-opacity="0.3"/>
  </svg>`;
}

function formatarPreco(preco) {
  if (preco === 0) return 'Grátis';
  return `R$ ${preco.toFixed(2).replace('.', ',')}`;
}

function renderizarGeneros() {
  elementosFiltroGenero.innerHTML = GENEROS.map(genero => `
    <button
      class="genre-btn ${genero === generoAtivo ? 'active' : ''}"
      data-genre="${genero}"
    >${genero}</button>
  `).join('');

  elementosFiltroGenero.querySelectorAll('.genre-btn').forEach(botao => {
    botao.addEventListener('click', () => {
      generoAtivo = botao.dataset.genre;
      renderizarGeneros();
      renderizarJogos();
    });
  });
}

function renderizarJogos() {
  let filtrados = DADOS_JOGOS;

  if (generoAtivo !== 'Todos') {
    filtrados = filtrados.filter(j => j.genero.toLowerCase() === generoAtivo.toLowerCase());
  }

  if (termoBusca) {
    const termoBuscaFormatado = termoBusca.toLowerCase();
    filtrados = filtrados.filter(j =>
      j.titulo.toLowerCase().includes(termoBuscaFormatado) ||
      j.desenvolvedor.toLowerCase().includes(termoBuscaFormatado) ||
      j.genero.toLowerCase().includes(termoBuscaFormatado)
    );
  }

  elementoInfoResultados.innerHTML = `<strong>${filtrados.length}</strong> jogo${filtrados.length !== 1 ? 's' : ''} encontrado${filtrados.length !== 1 ? 's' : ''}`;

  if (filtrados.length === 0) {
    elementoGradeJogos.innerHTML = `
      <div class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <h3>Nenhum jogo encontrado</h3>
        <p>Tente outro termo ou categoria.</p>
      </div>
    `;
    return;
  }

  elementoGradeJogos.innerHTML = filtrados.map(jogo => {
    const noCarrinho = carrinho.includes(jogo.id);
    const naListaDesejos = listaDesejos.includes(jogo.id);

    return `
    <article class="game-card" data-id="${jogo.id}">
      <div class="card-image">
        ${criarSvgCard(jogo.cores)}
        <span class="card-genre-badge">${jogo.genero.toUpperCase()}</span>
        <button class="card-wishlist-float ${naListaDesejos ? 'active' : ''}" data-wish="${jogo.id}" title="Lista de desejos">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="${naListaDesejos ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <div class="card-title-overlay">
          <h3>${jogo.titulo}</h3>
          <div class="card-genre-label">${jogo.genero}</div>
        </div>
      </div>
      <div class="card-body">
        <div class="card-info">
          <h4>${jogo.titulo}</h4>
          <div class="card-meta">${jogo.desenvolvedor} • ${jogo.ano}</div>
        </div>
        <div class="card-actions">
          <div class="card-price">${formatarPreco(jogo.preco)}</div>
          <button class="btn-wishlist ${naListaDesejos ? 'active' : ''}" data-wish="${jogo.id}" title="Lista de desejos">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="${naListaDesejos ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button class="btn-cart ${noCarrinho ? 'in-cart' : ''}" data-cart="${jogo.id}" title="${noCarrinho ? 'Remover do carrinho' : 'Adicionar ao carrinho'}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              ${noCarrinho
                ? '<polyline points="20 6 9 17 4 12"/>'
                : '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>'}
            </svg>
          </button>
        </div>
      </div>
    </article>
    `;
  }).join('');

  elementoGradeJogos.querySelectorAll('[data-cart]').forEach(botao => {
    botao.addEventListener('click', evento => {
      evento.stopPropagation();
      alternarCarrinho(Number(botao.dataset.cart));
    });
  });

  elementoGradeJogos.querySelectorAll('[data-wish]').forEach(botao => {
    botao.addEventListener('click', evento => {
      evento.stopPropagation();
      alternarListaDesejos(Number(botao.dataset.wish));
    });
  });
}

inputBusca.addEventListener('input', () => {
  termoBusca = inputBusca.value;
  renderizarJogos();
});

botaoSair.addEventListener('click', () => {
  localStorage.removeItem('gs_user');
  window.location.href = 'index.html';
});

atualizarContagemCarrinho();
renderizarGeneros();
renderizarJogos();