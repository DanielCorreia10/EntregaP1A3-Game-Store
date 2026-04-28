const carrinho = JSON.parse(localStorage.getItem('gs_cart') || '[]');
const elementoContagemCarrinho = document.getElementById('cartCount');
const botaoSair = document.getElementById('logoutBtn');
const alertaToast = document.getElementById('toast');

elementoContagemCarrinho.textContent = carrinho.length;
elementoContagemCarrinho.style.display = carrinho.length > 0 ? 'flex' : 'none';

botaoSair.addEventListener('click', () => {
  localStorage.removeItem('gs_user');
  window.location.href = 'index.html';
});

function exibirAlerta(mensagem, tipo = '') {
  alertaToast.textContent = mensagem;
  alertaToast.className = `toast ${tipo}`;
  requestAnimationFrame(() => requestAnimationFrame(() => alertaToast.classList.add('show')));
  setTimeout(() => alertaToast.classList.remove('show'), 3000);
}

const USUARIOS_MOCK = [
  { id: 1, nome: 'Admin', email: 'admin@api.com', papel: 'Administrador' },
  { id: 2, nome: 'Carlos', email: 'cliente@api.com', papel: 'Cliente' },
  { id: 3, nome: 'Diego Salvador', email: 'contatodiegosalvador@gmail.com', papel: 'Cliente' },
  { id: 4, nome: 'gabi', email: 'fab@bia.com', papel: 'Cliente' },
  { id: 5, nome: 'Gabriel', email: 'gabriel@gmail.com', papel: 'Cliente' },
  { id: 6, nome: 'Daniel', email: 'danieljcorreia10@gmail.com', papel: 'Administrador' },
];

const EMPRESAS_MOCK = [
  { id: 1, nome: 'Ubisoft', pais: 'França' },
  { id: 2, nome: 'FromSoftware', pais: 'Japão' },
  { id: 3, nome: 'CD Projekt Red', pais: 'Polônia' },
  { id: 4, nome: 'Valve', pais: 'EUA' },
  { id: 5, nome: 'Mojang', pais: 'Suécia' },
];

const CATEGORIAS_MOCK = GENEROS.filter(genero => genero !== 'Todos').map((genero, indice) => ({
  id: indice + 1,
  nome: genero,
  quantidade: DADOS_JOGOS.filter(jogo => jogo.genero === genero).length
}));

function renderizarSecao(idSecao) {
  document.querySelectorAll('.workspace-panel').forEach(painel => painel.classList.add('hidden'));
  document.querySelectorAll('.admin-card').forEach(cartao => cartao.classList.remove('active-card'));

  document.getElementById(`panel${capitalizarTexto(idSecao)}`).classList.remove('hidden');
  document.getElementById(`card${capitalizarTexto(idSecao)}`).classList.add('active-card');

  if (idSecao === 'usuarios') renderizarUsuarios();
  if (idSecao === 'empresas') renderizarEmpresas();
  if (idSecao === 'jogos') renderizarJogosAdmin();
  if (idSecao === 'categorias') renderizarCategorias();
  if (idSecao === 'perfis') renderizarPerfis();
  if (idSecao === 'relatorios') renderizarRelatorios();
}

function capitalizarTexto(texto) { return texto.charAt(0).toUpperCase() + texto.slice(1); }

function renderizarUsuarios() {
  const corpoTabela = document.getElementById('usuariosBody');
  corpoTabela.innerHTML = USUARIOS_MOCK.map(usuario => `
    <tr>
      <td>#${usuario.id}</td>
      <td>${usuario.nome}</td>
      <td>${usuario.email}</td>
      <td><span class="badge ${usuario.papel === 'Administrador' ? 'badge-admin' : 'badge-client'}">${usuario.papel}</span></td>
      <td><button class="btn-edit" data-uid="${usuario.id}">Editar</button></td>
    </tr>
  `).join('');

  corpoTabela.querySelectorAll('[data-uid]').forEach(botao => {
    botao.addEventListener('click', () => abrirEdicaoUsuario(Number(botao.dataset.uid)));
  });
}

function abrirEdicaoUsuario(idUsuario) {
  const usuario = USUARIOS_MOCK.find(u => u.id === idUsuario);
  if (!usuario) return;
  const formulario = document.getElementById('editUserForm');
  formulario.innerHTML = `
    <div class="edit-form-fields">
      <div class="edit-field">
        <label>Nome</label>
        <input type="text" value="${usuario.nome}" id="editName" />
      </div>
      <div class="edit-field">
        <label>E-mail</label>
        <input type="email" value="${usuario.email}" id="editEmail" />
      </div>
      <div class="edit-field">
        <label>Perfil</label>
        <select id="editRole">
          <option ${usuario.papel === 'Cliente' ? 'selected' : ''}>Cliente</option>
          <option ${usuario.papel === 'Administrador' ? 'selected' : ''}>Administrador</option>
        </select>
      </div>
      <button class="btn-save" id="saveUserBtn">Salvar alterações</button>
    </div>
  `;
  document.getElementById('saveUserBtn').addEventListener('click', () => {
    usuario.nome = document.getElementById('editName').value;
    usuario.email = document.getElementById('editEmail').value;
    usuario.papel = document.getElementById('editRole').value;
    renderizarUsuarios();
    exibirAlerta('Usuário atualizado com sucesso!', 'success');
  });
}

function renderizarEmpresas() {
  const corpoTabela = document.getElementById('empresasBody');
  corpoTabela.innerHTML = EMPRESAS_MOCK.map(empresa => `
    <tr>
      <td>#${empresa.id}</td>
      <td>${empresa.nome}</td>
      <td>${empresa.pais}</td>
      <td><button class="btn-edit">Editar</button></td>
    </tr>
  `).join('');
}

function renderizarJogosAdmin() {
  const corpoTabela = document.getElementById('jogosAdminBody');
  corpoTabela.innerHTML = DADOS_JOGOS.map(jogo => {
    const precoFormatado = jogo.preco === 0 ? 'Grátis' : `R$ ${jogo.preco.toFixed(2).replace('.', ',')}`;
    return `
    <tr>
      <td>#${jogo.id}</td>
      <td>${jogo.titulo}</td>
      <td>${jogo.genero}</td>
      <td>${precoFormatado}</td>
      <td><button class="btn-edit">Editar</button></td>
    </tr>`;
  }).join('');
}

function renderizarCategorias() {
  const corpoTabela = document.getElementById('categoriasBody');
  corpoTabela.innerHTML = CATEGORIAS_MOCK.map(categoria => `
    <tr>
      <td>#${categoria.id}</td>
      <td>${categoria.nome}</td>
      <td>${categoria.quantidade} jogo${categoria.quantidade !== 1 ? 's' : ''}</td>
      <td><button class="btn-edit">Editar</button></td>
    </tr>
  `).join('');
}

function renderizarPerfis() {
  const gradePerfis = document.getElementById('perfisGrid');
  gradePerfis.innerHTML = USUARIOS_MOCK.map(usuario => `
    <div class="perfil-card">
      <div class="perfil-avatar">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
      <h4>${usuario.nome}</h4>
      <p>${usuario.papel}</p>
    </div>
  `).join('');
}

function renderizarRelatorios() {
  const melhoresJogos = [...DADOS_JOGOS].sort((a, b) => b.preco - a.preco).slice(0, 6);
  const gradeRelatorios = document.getElementById('relatorioCards');
  gradeRelatorios.innerHTML = melhoresJogos.map((jogo, indice) => `
    <div class="relatorio-item">
      <div class="rank">#${indice + 1}</div>
      <h4>${jogo.titulo}</h4>
      <p>${jogo.desenvolvedor} · ${jogo.genero}</p>
    </div>
  `).join('');
}

document.querySelectorAll('.admin-card').forEach(cartao => {
  cartao.addEventListener('click', () => renderizarSecao(cartao.dataset.section));
});

renderizarSecao('usuarios');