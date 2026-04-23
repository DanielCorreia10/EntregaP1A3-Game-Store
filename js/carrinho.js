let carrinho = JSON.parse(localStorage.getItem('gs_cart') || '[]');
let biblioteca = JSON.parse(localStorage.getItem('gs_library') || '[]');

const elementoItensCarrinho = document.getElementById('cartItems');
const elementoCarrinhoVazio = document.getElementById('cartEmpty');
const elementoContagemCarrinho = document.getElementById('cartCount');
const elementoResumoTotal = document.getElementById('summaryTotal');
const botaoFinalizarCompra = document.getElementById('btnCheckout');
const alertaToast = document.getElementById('toast');
const botaoSair = document.getElementById('logoutBtn');

function exibirAlerta(mensagem, tipo = '') {
  alertaToast.textContent = mensagem;
  alertaToast.className = `toast ${tipo}`;
  requestAnimationFrame(() => requestAnimationFrame(() => alertaToast.classList.add('show')));
  setTimeout(() => alertaToast.classList.remove('show'), 3000);
}

function criarSvgMiniatura(cores) {
  const [cor1, cor2] = cores;
  const idAleatorio = Math.random().toString(36).slice(2, 8);
  return `<svg viewBox="0 0 72 54" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="t${idAleatorio}" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stop-color="${cor1}"/>
        <stop offset="100%" stop-color="${cor2}"/>
      </radialGradient>
    </defs>
    <rect width="72" height="54" fill="url(#t${idAleatorio})"/>
    <ellipse cx="50" cy="25" rx="35" ry="28" fill="${cor1}" fill-opacity="0.4"/>
  </svg>`;
}

function formatarPreco(preco) {
  return preco === 0 ? 'Grátis' : `R$ ${preco.toFixed(2).replace('.', ',')}`;
}

function obterJogosCarrinho() {
  return DADOS_JOGOS.filter(jogo => carrinho.includes(jogo.id));
}

function removerDoCarrinho(idJogo) {
  carrinho = carrinho.filter(id => id !== idJogo);
  localStorage.setItem('gs_cart', JSON.stringify(carrinho));
  renderizar();
  exibirAlerta('Item removido do carrinho.');
}

function renderizar() {
  const jogosNoCarrinho = obterJogosCarrinho();
  const total = jogosNoCarrinho.reduce((soma, jogo) => soma + jogo.preco, 0);

  elementoContagemCarrinho.textContent = carrinho.length;
  elementoContagemCarrinho.style.display = carrinho.length > 0 ? 'flex' : 'none';

  elementoResumoTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

  if (jogosNoCarrinho.length === 0) {
    elementoItensCarrinho.style.display = 'none';
    document.querySelector('.cart-summary').style.display = 'none';
    elementoCarrinhoVazio.style.display = 'block';
    return;
  }

  elementoCarrinhoVazio.style.display = 'none';
  elementoItensCarrinho.style.display = 'flex';
  document.querySelector('.cart-summary').style.display = 'block';

  elementoItensCarrinho.innerHTML = jogosNoCarrinho.map(jogo => `
    <div class="cart-item" data-id="${jogo.id}">
      <div class="cart-item-thumb">${criarSvgMiniatura(jogo.cores)}</div>
      <div class="cart-item-info">
        <h4>${jogo.titulo}</h4>
        <div class="cart-item-meta">${jogo.desenvolvedor} • ${jogo.genero}</div>
        <div class="cart-item-price">${formatarPreco(jogo.preco)}</div>
      </div>
      <button class="cart-item-remove" data-remove="${jogo.id}" title="Remover">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
          <path d="M10 11v6"/><path d="M14 11v6"/>
          <path d="M9 6V4h6v2"/>
        </svg>
      </button>
    </div>
  `).join('');

  elementoItensCarrinho.querySelectorAll('[data-remove]').forEach(botao => {
    botao.addEventListener('click', () => removerDoCarrinho(Number(botao.dataset.remove)));
  });
}

function gerarChave() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segmento = () => Array.from({ length: 4 }, () => caracteres[Math.floor(Math.random() * caracteres.length)]).join('');
  return `${segmento()}-${segmento()}-${segmento()}`;
}

botaoFinalizarCompra.addEventListener('click', () => {
  const jogosNoCarrinho = obterJogosCarrinho();
  if (jogosNoCarrinho.length === 0) return;

  const novasEntradas = jogosNoCarrinho.map(jogo => ({ id: jogo.id, chave: gerarChave() }));
  const itensExistentes = JSON.parse(localStorage.getItem('gs_library') || '[]');
  const itensMesclados = [...itensExistentes, ...novasEntradas.filter(entrada => !itensExistentes.find(item => item.id === entrada.id))];
  localStorage.setItem('gs_library', JSON.stringify(itensMesclados));

  carrinho = [];
  localStorage.setItem('gs_cart', JSON.stringify(carrinho));

  exibirAlerta('Compra finalizada! Jogos na sua biblioteca.', 'success');
  setTimeout(() => { window.location.href = 'biblioteca.html'; }, 1200);
});

botaoSair.addEventListener('click', () => {
  localStorage.removeItem('gs_user');
  window.location.href = 'index.html';
});

renderizar();