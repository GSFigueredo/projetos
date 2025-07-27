import { verificarLogin } from '../autenticador/index.js';

function usuarioLogado(user) {
  alert(`usuario logado ${user.nome}`)
}

// Assim que a página for carregada, chama a função verificarLogin
$(document).ready(async () => {
  const user = await verificarLogin();
  user ? usuarioLogado(user) : null;
});