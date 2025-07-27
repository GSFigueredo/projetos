import { verificarLogin } from '../autenticador/index.js';

function usuarioLogado(user) {
    //alert(`usuario logado ${user.nome}`);

    let linkLogin = $("#link_login");
    let linkCadastro = $("#link_cadastro");

    linkLogin.attr({
      "href": 'index.html',
    })
    linkLogin.text(`Olá, ${user.nome}`)

    linkCadastro.attr({
      "href": 'index.html',
      "class": 'nav-link sair'
    })
    linkCadastro.text(`SAIR`)

    linkCadastro.on('click', evento => {
      evento.preventDefault(); // não permitir que faça evento padrão da tag, exemplo: link, não permite que ele redirecione
      localStorage.clear();
      window.location.href = 'index.html';
    });
}

// Assim que a página for carregada, chama a função verificarLogin
$(document).ready(async () => {
  const user = await verificarLogin();
  user ? usuarioLogado(user) : null;
});