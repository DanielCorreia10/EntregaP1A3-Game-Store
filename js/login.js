const botaoEntrar = document.getElementById('btnLogin');
const inputEmail = document.getElementById('email');
const inputSenha = document.getElementById('senha');
const botaoAlternarSenha = document.getElementById('togglePw');
const iconeOlho = document.getElementById('eyeIcon');
const alertaToast = document.getElementById('toast');

const OLHO_ABERTO = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
const OLHO_FECHADO = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`;

botaoAlternarSenha.addEventListener('click', () => {
  const estaOculta = inputSenha.type === 'password';
  inputSenha.type = estaOculta ? 'text' : 'password';
  iconeOlho.innerHTML = estaOculta ? OLHO_FECHADO : OLHO_ABERTO;
});

function exibirAlerta(mensagem, tipo = '') {
  alertaToast.textContent = mensagem;
  alertaToast.className = `toast ${tipo}`;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => alertaToast.classList.add('show'));
  });
  setTimeout(() => alertaToast.classList.remove('show'), 3000);
}

botaoEntrar.addEventListener('click', processarLogin);

[inputEmail, inputSenha].forEach(campo => {
  campo.addEventListener('keydown', evento => {
    if (evento.key === 'Enter') processarLogin();
  });
});

function processarLogin() {
  const email = inputEmail.value.trim();
  const senha = inputSenha.value.trim();

  if (!email) {
    exibirAlerta('Informe seu e-mail.', 'error');
    inputEmail.focus();
    return;
  }

  if (!email.includes('@')) {
    exibirAlerta('E-mail inválido.', 'error');
    inputEmail.focus();
    return;
  }

  if (!senha) {
    exibirAlerta('Informe sua senha.', 'error');
    inputSenha.focus();
    return;
  }

  botaoEntrar.textContent = 'Entrando...';
  botaoEntrar.disabled = true;

  setTimeout(() => {
    localStorage.setItem('gs_user', JSON.stringify({ email }));
    exibirAlerta('Login realizado com sucesso!', 'success');
    setTimeout(() => {
      window.location.href = 'jogos.html';
    }, 800);
  }, 1000);
}