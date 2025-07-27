import { verificarLogin } from '../autenticar/index.js';

function usuarioLogado(user) {
  alert(`login detectado ${user.nome}`)
}

// Assim que a página for carregada, chama a função verificarLogin
$(document).ready(async () => {
  const user = await verificarLogin();
  user ? usuarioLogado(user) : null;
});